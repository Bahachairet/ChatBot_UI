// src/app/auth/auth.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  avatar: string = '';
  isRegister: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleForm(): void {
    this.isRegister = !this.isRegister;
  }

  register(): void {
    this.authService.register(this.username, this.password, this.avatar).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration error:', error);
      }
    );
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.router.navigate(['/chat']);
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }
}
