import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SupplierService } from '../../core/services/supplier.service';
import { Supplier } from '../../core/models/supplier.model';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss'
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  displayedColumns = ['name', 'phone', 'email', 'address', 'status', 'actions'];
  isLoading = false;

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.supplierService.getAll().subscribe({
      next: (response) => {
        this.suppliers = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addNew(): void {
    this.router.navigate(['/suppliers/new']);
  }

  edit(id: number): void {
    this.router.navigate(['/suppliers/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.delete(id).subscribe({
        next: () => this.loadSuppliers()
      });
    }
  }
}