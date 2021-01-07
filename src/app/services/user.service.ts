import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getUser(id) {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  addUser(data: User) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }
  updateUser(id, data: User) {
    return this.http.put(`${this.apiUrl}/users/${id}`, data);
  }
  deleteUser(id) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
