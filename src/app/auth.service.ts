import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) {}

  register(username: string, password: string, avatar: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, avatar });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.auth) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', username);
          localStorage.setItem('avatar', response.avatar);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
  }
}

interface LoginResponse {
  auth: boolean;
  token: string;
  avatar: string; 
}