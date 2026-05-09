import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ReportService } from '../../core/services/report.service';
import { StockReportItem } from '../../core/models/report.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  stockReport: StockReportItem[] = [];
  isLoading = false;
  displayedColumns = [
    'itemCode',
    'itemName',
    'categoryName',
    'unitName',
    'totalPurchased',
    'totalSold',
    'currentStock',
    'reorderLevel',
    'stockStatus'
  ];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadStockReport();
  }

  loadStockReport(): void {
    this.isLoading = true;
    this.reportService.getStockReport().subscribe({
      next: (response) => {
        this.stockReport = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'OK': return 'status-ok';
      case 'Low Stock': return 'status-low';
      case 'Out of Stock': return 'status-out';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'OK': return 'check_circle';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'cancel';
      default: return '';
    }
  }

  get totalItems(): number {
    return this.stockReport.length;
  }

  get lowStockItems(): number {
    return this.stockReport.filter(x => x.stockStatus === 'Low Stock').length;
  }

  get outOfStockItems(): number {
    return this.stockReport.filter(x => x.stockStatus === 'Out of Stock').length;
  }
}