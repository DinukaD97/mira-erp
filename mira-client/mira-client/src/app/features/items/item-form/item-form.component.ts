import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ItemService } from '../../../core/services/item.service';
import { Category, Unit } from '../../../core/models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  categories: Category[] = [];
  units: Unit[] = [];
  isEditMode = false;
  itemId: number | null = null;
  isLoading = false;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      unitId: ['', Validators.required],
      costPrice: [0, [Validators.required, Validators.min(0)]],
      salePrice: [0, [Validators.required, Validators.min(0)]],
      reorderLevel: [0, Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadUnits();

    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId) {
      this.isEditMode = true;
      this.loadItem(this.itemId);
    }
  }

  loadCategories(): void {
    this.itemService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    });
  }

  loadUnits(): void {
    this.itemService.getUnits().subscribe({
      next: (response) => {
        this.units = response.data;
      }
    });
  }

  loadItem(id: number): void {
    this.isLoading = true;
    this.itemService.getItemById(id).subscribe({
      next: (response) => {
        const item = response.data;
        this.itemForm.patchValue({
          code: item.code,
          name: item.name,
          categoryId: item.categoryId,
          unitId: item.unitId,
          costPrice: item.costPrice,
          salePrice: item.salePrice,
          reorderLevel: item.reorderLevel,
          isActive: item.isActive
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) return;

    this.isSaving = true;
    const formValue = this.itemForm.value;

    if (this.isEditMode && this.itemId) {
      this.itemService.updateItem(this.itemId, formValue).subscribe({
        next: () => {
          this.router.navigate(['/items']);
        },
        error: () => {
          this.isSaving = false;
        }
      });
    } else {
      this.itemService.createItem(formValue).subscribe({
        next: () => {
          this.router.navigate(['/items']);
        },
        error: () => {
          this.isSaving = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/items']);
  }
}