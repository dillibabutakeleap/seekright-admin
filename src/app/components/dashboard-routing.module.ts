import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/add',
    component: AddUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
