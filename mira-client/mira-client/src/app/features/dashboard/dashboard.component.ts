import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cards = [
    {
      title: 'Total Items',
      value: '0',
      icon: 'inventory_2',
      color: '#1a237e',
      background: '#e8eaf6'
    },
    {
      title: 'Customers',
      value: '0',
      icon: 'people',
      color: '#1b5e20',
      background: '#e8f5e9'
    },
    {
      title: 'Suppliers',
      value: '0',
      icon: 'local_shipping',
      color: '#e65100',
      background: '#fff3e0'
    },
    {
      title: 'Total Sales',
      value: '0',
      icon: 'point_of_sale',
      color: '#880e4f',
      background: '#fce4ec'
    }
  ];
}