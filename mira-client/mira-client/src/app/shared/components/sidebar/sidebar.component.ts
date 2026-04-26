import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Items', icon: 'inventory_2', route: '/items' },
    { label: 'Customers', icon: 'people', route: '/customers' },
    { label: 'Suppliers', icon: 'local_shipping', route: '/suppliers' },
    { label: 'Locations', icon: 'warehouse', route: '/locations' },
    { label: 'Purchases', icon: 'shopping_cart', route: '/purchases' },
    { label: 'Sales', icon: 'point_of_sale', route: '/sales' },
    { label: 'Reports', icon: 'bar_chart', route: '/reports' },
  ];
}