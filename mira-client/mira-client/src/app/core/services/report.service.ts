import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { StockReportItem } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://localhost:7225/api';

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
}