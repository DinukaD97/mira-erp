import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Purchase, CreatePurchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'https://localhost:7225/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAll(): Observable<ApiResponse<Purchase[]>> {
    return this.http.get<ApiResponse<Purchase[]>>(
      `${this.apiUrl}/purchase`,
      { headers: this.getHeaders() }
    );
  }

  getById(id: number): Observable<ApiResponse<Purchase>> {
    return this.http.get<ApiResponse<Purchase>>(
      `${this.apiUrl}/purchase/${id}`,
      { headers: this.getHeaders() }
    );
  }

  create(dto: CreatePurchase): Observable<ApiResponse<Purchase>> {
    return this.http.post<ApiResponse<Purchase>>(
      `${this.apiUrl}/purchase`,
      dto,
      { headers: this.getHeaders() }
    );
  }
}