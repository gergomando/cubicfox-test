import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../../constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) { }

  getHeaders(): object {
    return {
        headers: {
        "Authorization": `Bearer ${this.storageService.getAccessToken()}`,
        "Accept": "application/json'"
      }
    };
  }

  fetchDataFromApi(endPointUrl: string): Observable<unknown> {
    return this.http.get<any>(API_BASE_URL + endPointUrl, this.getHeaders())
      .pipe(
        map((response: any) => response)
      );
  }

  postDataToApi(endPointUrl: string, data: object): Observable<unknown> {
    return this.http.post<any>(API_BASE_URL + endPointUrl, data, this.getHeaders())
      .pipe(
        map((response: any) => response)
      );
  }
}