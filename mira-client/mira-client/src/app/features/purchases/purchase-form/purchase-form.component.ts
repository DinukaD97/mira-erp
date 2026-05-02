import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PurchaseService } from '../../../core/services/purchase.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { ItemService } from '../../../core/services/item.service';
import { Supplier } from '../../../core/models/supplier.model';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-purchase-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './purchase-form.component.html',
  styleUrl: './purchase-form.component.scss'
})
export class PurchaseFormComponent implements OnInit {
  purchaseForm: FormGroup;
  suppliers: Supplier[] = [];
  items: Item[] = [];
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private supplierService: SupplierService,
    private itemService: ItemService,
    private router: Router
  ) {
    this.purchaseForm = this.fb.group({
      invoiceNo: ['', Validators.required],
      supplierId: ['', Validators.required],
      invoiceDate: [new Date(), Validators.required],
      remark: [''],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadItems();
    this.addItem();
  }

  get itemsArray(): FormArray {
    return this.purchaseForm.get('items') as FormArray;
  }

  loadSuppliers(): void {
    this.supplierService.getAll().subscribe({
      next: (response) => {
        this.suppliers = response.data;
      }
    });
  }

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (response) => {
        this.items = response.data;
      }
    });
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      itemId: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      unitCost: [0, [Validators.required, Validators.min(0)]]
    });
    this.itemsArray.push(itemGroup);
  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  getLineTotal(index: number): number {
    const item = this.itemsArray.at(index);
    const qty = item.get('qty')?.value || 0;
    const unitCost = item.get('unitCost')?.value || 0;
    return qty * unitCost;
  }

  getTotalAmount(): number {
    let total = 0;
    for (let i = 0; i < this.itemsArray.length; i++) {
      total += this.getLineTotal(i);
    }
    return total;
  }

  onItemSelected(index: number): void {
    const itemId = this.itemsArray.at(index).get('itemId')?.value;
    const selectedItem = this.items.find(x => x.id === itemId);
    if (selectedItem) {
      this.itemsArray.at(index).patchValue({
        unitCost: selectedItem.costPrice
      });
    }
  }

  onSubmit(): void {
    if (this.purchaseForm.invalid) return;
    if (this.itemsArray.length === 0) return;

    this.isSaving = true;
    const formValue = this.purchaseForm.value;

    const dto = {
      invoiceNo: formValue.invoiceNo,
      supplierId: formValue.supplierId,
      invoiceDate: formValue.invoiceDate,
      remark: formValue.remark,
      items: formValue.items
    };

    this.purchaseService.create(dto).subscribe({
      next: () => {
        this.router.navigate(['/purchases']);
      },
      error: () => {
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/purchases']);
  }
}