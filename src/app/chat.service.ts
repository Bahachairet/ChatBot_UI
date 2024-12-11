// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/llm'; 

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.post(`${this.apiUrl}/chat`, { message }, { headers });
  }

  getChatHistory(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get(`${this.apiUrl}/history`, { headers });
  }
}
