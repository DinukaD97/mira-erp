import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  fullName: string = '';
  role: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.fullName = localStorage.getItem('fullName') || '';
    this.role = localStorage.getItem('role') || '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}