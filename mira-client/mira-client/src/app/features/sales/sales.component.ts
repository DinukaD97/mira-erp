import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SalesService } from '../../core/services/sales.service';
import { Sale } from '../../core/models/sales.model';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
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
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addNew(): void {
    this.router.navigate(['/sales/new']);
  }

  viewDetail(id: number): void {
    this.router.navigate(['/sales/detail', id]);
  }
}