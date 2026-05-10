import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer.model';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchText = '';
  displayedColumns = ['name', 'phone', 'email', 'address', 'status', 'actions'];
  isLoading = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.customerService.getAll().subscribe({
      next: (response) => {
        this.customers = response.data;
        this.filteredCustomers = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const text = this.searchText.toLowerCase().trim();
    if (!text) {
      this.filteredCustomers = this.customers;
      return;
    }
    this.filteredCustomers = this.customers.filter(c =>
      c.name.toLowerCase().includes(text) ||
      c.phone.toLowerCase().includes(text) ||
      c.email.toLowerCase().includes(text)
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredCustomers = this.customers;
  }

  addNew(): void {
    this.router.navigate(['/customers/new']);
  }

  edit(id: number): void {
    this.router.navigate(['/customers/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.delete(id).subscribe({
        next: () => this.loadCustomers()
      });
    }
  }
}