import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private excludedUrlsRegex: RegExp[];
  private excludedUrls = ['.svg'];
  constructor(
    private spinner: NgxSpinnerService,
    @Inject(LOCAL_STORAGE) private storageService: StorageService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let clonedRequest: any = {};
    if (this.storageService.get('seekright-admin-loggedInUser')) {
      const userDetails = this.storageService.get(
        'seekright-admin-loggedInUser'
      );
      clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `${userDetails ? userDetails.access_token : ''}`
        ),
      });
    } else {
      clonedRequest = request.clone({
        headers: request.headers,
      });
    }
    console.log(request.method);
    // send the newly created request
    this.spinner.show();
    return next.handle(clonedRequest).pipe(finalize(() => this.spinner.hide()));
  }
}
