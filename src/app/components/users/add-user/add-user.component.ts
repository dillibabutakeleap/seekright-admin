import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AlertService } from '@full-fledged/alerts';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  isLinear = false;
  dataForm: FormGroup;
  siteForm: FormGroup;
  @ViewChild('stepper')
  private stepper: MatStepper;

  public errorText: string = '';
  createdUser: any;
  directions: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getDirections();
  }

  buildForm() {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      org_name: ['', [Validators.required]],
      db_name: ['', [Validators.required]],
    });
    this.siteForm = this.fb.group({
      site_name: ['', Validators.required],
      org_id: [
        this.createdUser ? this.createdUser.org_id : '',
        Validators.required,
      ],
      direction: ['LHS', Validators.required],
      start_chinage: ['', Validators.required],
      end_chinage: ['', Validators.required],
      total_km: ['', Validators.required],
      site_value: ['', Validators.required],
    });
  }

  onUserRegisterClick() {
    this.errorText = '';
    if (this.dataForm.invalid) {
      this.errorText = 'Please fill all details in the form.';
      return;
    }
    const payload = this.dataForm.value;
    if (payload.password !== payload.confirmPassword) {
      this.errorText = 'Password and confirmPassword not equal.';
      return;
    }
    this.dashboardService.createUser(this.dataForm.value).subscribe(
      (res: any) => {
        this.createdUser = res.user;
        this.siteForm.get('org_id').setValue(this.createdUser.org_id);
        this.stepper.next();
      },
      (error) => {
        console.error(error);
        this.alertService.danger(error.message);
      }
    );
  }

  getDirections() {
    this.dashboardService.getDirections().subscribe(
      (res: any) => {
        this.directions = res.directions;
      },
      (error) => {
        console.error(error);
        this.alertService.danger(error.message);
      }
    );
  }

  onSiteAddClick() {
    this.errorText = '';
    if (this.siteForm.invalid) {
      this.errorText = 'Please fill all details in the form.';
      return;
    }
    this.dashboardService.addSite(this.siteForm.value).subscribe(
      (res: any) => {
        this.stepper.next();
      },
      (error) => {
        console.error(error);
        this.alertService.danger(error.message);
      }
    );
  }
}
