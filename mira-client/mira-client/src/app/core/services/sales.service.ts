import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Sale, CreateSale } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'https://localhost:7225/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAll(): Observable<ApiResponse<Sale[]>> {
    return this.http.get<ApiResponse<Sale[]>>(
      `${this.apiUrl}/sales`,
      { headers: this.getHeaders() }
    );
  }

  getById(id: number): Observable<ApiResponse<Sale>> {
    return this.http.get<ApiResponse<Sale>>(
      `${this.apiUrl}/sales/${id}`,
      { headers: this.getHeaders() }
    );
  }

  create(dto: CreateSale): Observable<ApiResponse<Sale>> {
    return this.http.post<ApiResponse<Sale>>(
      `${this.apiUrl}/sales`,
      dto,
      { headers: this.getHeaders() }
    );
  }
}