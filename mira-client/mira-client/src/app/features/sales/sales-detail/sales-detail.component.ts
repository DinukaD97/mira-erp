import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SalesService } from '../../../core/services/sales.service';
import { Sale } from '../../../core/models/sales.model';

@Component({
  selector: 'app-sales-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './sales-detail.component.html',
  styleUrl: './sales-detail.component.scss'
})
export class SalesDetailComponent implements OnInit {
  sale: Sale | null = null;
  isLoading = false;
  displayedColumns = ['itemCode', 'itemName', 'qty', 'unitPrice', 'lineTotal'];

  constructor(
    private salesService: SalesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadSale(id);
    }
  }

  loadSale(id: number): void {
    this.isLoading = true;
    this.salesService.getById(id).subscribe({
      next: (response) => {
        this.sale = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/sales']);
  }
}