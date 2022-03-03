import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from '@full-fledged/alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: any[] = [];
  search: any = {
    size: 10,
    page: 0,
  };
  totalRecords = 0;
  constructor(
    private dashboardService: DashboardService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.spinner.show();
    this.dashboardService
      .getUsers(this.search).subscribe(
        (res: any) => {
          this.users = res.data;
          this.totalRecords = res.count;
          console.log(this.users);
        },
        (error) => {
          console.error(error);
          this.alertService.danger(error.message);
        }
      );
  }

  onPageChange(ev: PageEvent) {
    this.search.page = ev.pageIndex;
    this.search.size = ev.pageSize;
    this.getUsers();
  }
}
