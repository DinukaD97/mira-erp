import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PurchaseService } from '../../core/services/purchase.service';
import { Purchase } from '../../core/models/purchase.model';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent implements OnInit {
  purchases: Purchase[] = [];
  displayedColumns = ['invoiceNo', 'supplier', 'invoiceDate', 'totalAmount', 'remark', 'actions'];
  isLoading = false;

  constructor(
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.isLoading = true;
    this.purchaseService.getAll().subscribe({
      next: (response) => {
        this.purchases = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addNew(): void {
    this.router.navigate(['/purchases/new']);
  }

  viewDetail(id: number): void {
    this.router.navigate(['/purchases/detail', id]);
  }
}