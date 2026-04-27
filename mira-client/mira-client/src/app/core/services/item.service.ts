import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Category, Unit, Item, CreateItem, UpdateItem } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://localhost:7225/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Categories
  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(
      `${this.apiUrl}/category`,
      { headers: this.getHeaders() }
    );
  }

  createCategory(name: string): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(
      `${this.apiUrl}/category`,
      { name },
      { headers: this.getHeaders() }
    );
  }

  // Units
  getUnits(): Observable<ApiResponse<Unit[]>> {
    return this.http.get<ApiResponse<Unit[]>>(
      `${this.apiUrl}/unit`,
      { headers: this.getHeaders() }
    );
  }

  createUnit(name: string): Observable<ApiResponse<Unit>> {
    return this.http.post<ApiResponse<Unit>>(
      `${this.apiUrl}/unit`,
      { name },
      { headers: this.getHeaders() }
    );
  }

  // Items
  getItems(): Observable<ApiResponse<Item[]>> {
    return this.http.get<ApiResponse<Item[]>>(
      `${this.apiUrl}/item`,
      { headers: this.getHeaders() }
    );
  }

  getItemById(id: number): Observable<ApiResponse<Item>> {
    return this.http.get<ApiResponse<Item>>(
      `${this.apiUrl}/item/${id}`,
      { headers: this.getHeaders() }
    );
  }

  createItem(item: CreateItem): Observable<ApiResponse<Item>> {
    return this.http.post<ApiResponse<Item>>(
      `${this.apiUrl}/item`,
      item,
      { headers: this.getHeaders() }
    );
  }

  updateItem(id: number, item: UpdateItem): Observable<ApiResponse<Item>> {
    return this.http.put<ApiResponse<Item>>(
      `${this.apiUrl}/item/${id}`,
      item,
      { headers: this.getHeaders() }
    );
  }

  deleteItem(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.apiUrl}/item/${id}`,
      { headers: this.getHeaders() }
    );
  }
}