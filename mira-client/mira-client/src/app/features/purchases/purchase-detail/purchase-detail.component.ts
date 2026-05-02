import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PurchaseService } from '../../../core/services/purchase.service';
import { Purchase } from '../../../core/models/purchase.model';

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './purchase-detail.component.html',
  styleUrl: './purchase-detail.component.scss'
})
export class PurchaseDetailComponent implements OnInit {
  purchase: Purchase | null = null;
  isLoading = false;
  displayedColumns = ['itemCode', 'itemName', 'qty', 'unitCost', 'lineTotal'];

  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadPurchase(id);
    }
  }

  loadPurchase(id: number): void {
    this.isLoading = true;
    this.purchaseService.getById(id).subscribe({
      next: (response) => {
        this.purchase = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/purchases']);
  }
}