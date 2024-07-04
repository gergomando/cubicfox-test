import { Injectable } from '@angular/core';
import { TOKEN_IN_STORAGE } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAccessToken(): string {
    return localStorage.getItem(TOKEN_IN_STORAGE) || ''; 
  }

  setAccessToken(token = ''): void {
    if (!!token) {
      localStorage.setItem(TOKEN_IN_STORAGE, token);
    }
  }

}
