import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  dataForm: FormGroup;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(LOCAL_STORAGE) private storageService: StorageService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.buildDataForm();
  }
  buildDataForm() {
    this.dataForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.isSubmitted = true;
    console.log(this.dataForm)
    // if (this.dataForm.invalid) {
    //   return;
    // }
    const payload = this.dataForm.value;
    if (this.dataForm.invalid) {
      this.authService.login(payload).subscribe(
        (res: any) => {
          console.log(res);
          let user=res.responseData[0].records[0]
          this.storageService.set('seekright-admin-loggedInUser', JSON.stringify(user));
          this.alertService.success('Login Successful.');
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error(error);
          this.alertService.danger(error.message);

        }
      );
    }
  }
}
