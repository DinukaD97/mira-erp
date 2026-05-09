import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ReportService } from '../../core/services/report.service';
import { StockReportItem, SalesSummary } from '../../core/models/report.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  // Stock Report
  stockReport: StockReportItem[] = [];
  isLoadingStock = false;
  stockColumns = [
    'itemCode', 'itemName', 'categoryName', 'unitName',
    'totalPurchased', 'totalSold', 'currentStock',
    'reorderLevel', 'stockStatus'
  ];

  // Sales Summary
  salesSummary: SalesSummary | null = null;
  isLoadingSales = false;
  customerColumns = ['customerName', 'totalInvoices', 'totalRevenue'];
  bestSellingColumns = ['itemCode', 'itemName', 'categoryName', 'totalQtySold', 'totalRevenue'];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadStockReport();
    this.loadSalesSummary();
  }

  loadStockReport(): void {
    this.isLoadingStock = true;
    this.reportService.getStockReport().subscribe({
      next: (response) => {
        this.stockReport = response.data;
        this.isLoadingStock = false;
      },
      error: () => {
        this.isLoadingStock = false;
      }
    });
  }

  loadSalesSummary(): void {
    this.isLoadingSales = true;
    this.reportService.getSalesSummary().subscribe({
      next: (response) => {
        this.salesSummary = response.data;
        this.isLoadingSales = false;
      },
      error: () => {
        this.isLoadingSales = false;
      }
    });
  }

  refreshAll(): void {
    this.loadStockReport();
    this.loadSalesSummary();
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