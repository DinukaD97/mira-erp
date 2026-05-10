import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemService } from '../../core/services/item.service';
import { Item } from '../../core/models/item.model';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchText = '';
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
        this.filteredItems = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const text = this.searchText.toLowerCase().trim();
    if (!text) {
      this.filteredItems = this.items;
      return;
    }
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(text) ||
      item.code.toLowerCase().includes(text) ||
      item.categoryName.toLowerCase().includes(text)
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredItems = this.items;
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