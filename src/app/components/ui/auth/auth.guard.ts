import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router // private alertService: AlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let loggedInUser = localStorage.getItem('seekright-admin-loggedInUser');
    if (loggedInUser) {
      loggedInUser = JSON.parse(loggedInUser);  
    }
    console.log(loggedInUser['user_roles']);
    if (
      !loggedInUser 
      // ||
      // (loggedInUser && loggedInUser['user_roles'].includes('ADMIN'))
    ) {
      //   this.alertService.error(
      //     'UnAuthorized Please login before accessing the route'
      //   );
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
