import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { LocationModel, CreateLocation, UpdateLocation } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://localhost:7225/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAll(): Observable<ApiResponse<LocationModel[]>> {
    return this.http.get<ApiResponse<LocationModel[]>>(`${this.apiUrl}/location`, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<ApiResponse<LocationModel>> {
    return this.http.get<ApiResponse<LocationModel>>(`${this.apiUrl}/location/${id}`, { headers: this.getHeaders() });
  }

  create(dto: CreateLocation): Observable<ApiResponse<LocationModel>> {
    return this.http.post<ApiResponse<LocationModel>>(`${this.apiUrl}/location`, dto, { headers: this.getHeaders() });
  }

  update(id: number, dto: UpdateLocation): Observable<ApiResponse<LocationModel>> {
    return this.http.put<ApiResponse<LocationModel>>(`${this.apiUrl}/location/${id}`, dto, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/location/${id}`, { headers: this.getHeaders() });
  }
}