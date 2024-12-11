// src/app/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  username: string = '';
  avatar: string = '';

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadChatHistory();
    this.username = localStorage.getItem('username') || '';
    this.avatar = localStorage.getItem('avatar') || '';
  }

  loadChatHistory(): void {
    this.chatService.getChatHistory().subscribe(
      response => {
        this.messages = response;
      },
      error => {
        console.error('Error loading chat history:', error);
      }
    );
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.newMessage).subscribe(
      response => {
        this.messages.push({ userMessage: this.newMessage, modelResponse: response.message });
        this.newMessage = '';
      },
      error => {
        console.error('Error sending message:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
