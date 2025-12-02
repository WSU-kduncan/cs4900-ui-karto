import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get accessToken() {
    return localStorage.getItem('accessToken');
  }
  get email() {
    return localStorage.getItem('email');
  }
  get username() {
    return localStorage.getItem('username');
  }
  set accessToken(token: string | null) {
    if (token) localStorage.setItem('accessToken', token);
    else localStorage.removeItem('accessToken');
  }
  set username(token: string | null) {
    if (token) localStorage.setItem('username', token);
    else localStorage.removeItem('username');
  }
  set email(token: string | null) {
    if (token) localStorage.setItem('email', token);
    else localStorage.removeItem('email');
  }

  logout() {
    this.email = null;
    this.username = null;
    this.accessToken = null;
  }
}
