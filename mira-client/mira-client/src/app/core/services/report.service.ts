import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { StockReportItem, SalesSummary, DashboardSummary } from '../models/report.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  //private apiUrl = 'https://localhost:7225/api';
    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getStockReport(): Observable<ApiResponse<StockReportItem[]>> {
    return this.http.get<ApiResponse<StockReportItem[]>>(
      `${this.apiUrl}/report/stock`,
      { headers: this.getHeaders() }
    );
  }

  getSalesSummary(): Observable<ApiResponse<SalesSummary>> {
    return this.http.get<ApiResponse<SalesSummary>>(
      `${this.apiUrl}/report/sales-summary`,
      { headers: this.getHeaders() }
    );
  }

  getDashboardSummary(): Observable<ApiResponse<DashboardSummary>> {
    return this.http.get<ApiResponse<DashboardSummary>>(
      `${this.apiUrl}/report/dashboard`,
      { headers: this.getHeaders() }
    );
  }
}