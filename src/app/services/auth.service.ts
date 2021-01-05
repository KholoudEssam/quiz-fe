import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ role; token; userId }>(
      `${this.apiUrl}/auth/login`,
      { username, password }
    );
  }
}
