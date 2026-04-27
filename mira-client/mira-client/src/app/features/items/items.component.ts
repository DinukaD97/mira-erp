import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ItemService } from '../../core/services/item.service';
import { Item } from '../../core/models/item.model';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  displayedColumns = ['code', 'name', 'category', 'unit', 'costPrice', 'salePrice', 'stockQty', 'status', 'actions'];
  isLoading = false;

  constructor(
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems().subscribe({
      next: (response) => {
        this.items = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addNew(): void {
    this.router.navigate(['/items/new']);
  }

  edit(id: number): void {
    this.router.navigate(['/items/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id).subscribe({
        next: () => {
          this.loadItems();
        }
      });
    }
  }
}