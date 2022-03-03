import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private alertService: AlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedInUser = this.storage.get('seekright-admin-loggedInUser');
    if (!loggedInUser) {
      this.alertService.danger(
        'UnAuthorized Please login before accessing the route'
      );
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }else if( (loggedInUser && !loggedInUser['user_roles'].includes('ADMIN'))){
      this.alertService.danger(
        'You are not allowed to use this website'
      );
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
