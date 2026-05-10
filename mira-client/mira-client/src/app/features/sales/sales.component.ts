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
import { SalesService } from '../../core/services/sales.service';
import { Sale } from '../../core/models/sales.model';

@Component({
  selector: 'app-sales',
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
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  filteredSales: Sale[] = [];
  searchText = '';
  displayedColumns = ['invoiceNo', 'customer', 'invoiceDate', 'totalAmount', 'remark', 'actions'];
  isLoading = false;

  constructor(
    private salesService: SalesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.isLoading = true;
    this.salesService.getAll().subscribe({
      next: (response) => {
        this.sales = response.data;
        this.filteredSales = response.data;
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
      this.filteredSales = this.sales;
      return;
    }
    this.filteredSales = this.sales.filter(s =>
      s.invoiceNo.toLowerCase().includes(text) ||
      s.customerName.toLowerCase().includes(text) ||
      s.remark.toLowerCase().includes(text)
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredSales = this.sales;
  }

  addNew(): void {
    this.router.navigate(['/sales/new']);
  }

  viewDetail(id: number): void {
    this.router.navigate(['/sales/detail', id]);
  }
}