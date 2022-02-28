import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { apiConfig } from 'src/api.config';
import { environment } from 'src/environments/environment';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends CommonService {

  API_ENDPOINT: string;
  constructor(private httpClient: HttpClient) {
    super();
    this.API_ENDPOINT = environment.api_endpoint;
  }

  getUsers(search: any) {
    let params = this.generateHttpParams(search);
    return this.httpClient
      .get(`${this.API_ENDPOINT}${apiConfig.admin.users}`, { params })
      .pipe(
        map((response) => response),
        catchError((err) => err.error)
      );
  }
  createUser(value: any) {
    return this.httpClient
    .post(`${this.API_ENDPOINT}${apiConfig.admin.userAdd}`, value)
    .pipe(
      map((response) => response),
      catchError((err) => err.error)
    );
  }
  getDirections() {
    return this.httpClient
      .get(`${this.API_ENDPOINT}${apiConfig.admin.directions}`, { })
      .pipe(
        map((response) => response),
        catchError((err) => err.error)
      );
  }

  addSite(value: any) {
    return this.httpClient
    .post(`${this.API_ENDPOINT}${apiConfig.admin.userSiteAdd}`, value)
    .pipe(
      map((response) => response),
      catchError((err) => err.error)
    );
  }
}
