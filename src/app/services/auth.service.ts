import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ role; token; userId; username }>(
      `${this.apiUrl}/auth/login`,
      { username, password }
    );
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
