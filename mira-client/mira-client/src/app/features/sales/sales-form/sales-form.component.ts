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
import { SalesService } from '../../../core/services/sales.service';
import { CustomerService } from '../../../core/services/customer.service';
import { ItemService } from '../../../core/services/item.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Customer } from '../../../core/models/customer.model';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-sales-form',
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
  templateUrl: './sales-form.component.html',
  styleUrl: './sales-form.component.scss'
})
export class SalesFormComponent implements OnInit {
  salesForm: FormGroup;
  customers: Customer[] = [];
  items: Item[] = [];
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private customerService: CustomerService,
    private itemService: ItemService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.salesForm = this.fb.group({
      invoiceNo: ['', Validators.required],
      customerId: ['', Validators.required],
      invoiceDate: [new Date(), Validators.required],
      remark: [''],
      items: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadItems();
    this.addItem();
  }

  get itemsArray(): FormArray {
    return this.salesForm.get('items') as FormArray;
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (response) => {
        this.customers = response.data;
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
      unitPrice: [0, [Validators.required, Validators.min(0.01)]]
    });
    this.itemsArray.push(itemGroup);
  }

  removeItem(index: number): void {
    if (this.itemsArray.length === 1) {
      this.notification.warning('At least one item is required.');
      return;
    }
    this.itemsArray.removeAt(index);
  }

  getLineTotal(index: number): number {
    const item = this.itemsArray.at(index);
    const qty = item.get('qty')?.value || 0;
    const unitPrice = item.get('unitPrice')?.value || 0;
    return qty * unitPrice;
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
        unitPrice: selectedItem.salePrice
      });
    }
  }

  onSubmit(): void {
    if (this.salesForm.invalid) {
      this.notification.warning('Please fill in all required fields.');
      this.salesForm.markAllAsTouched();
      return;
    }

    if (this.getTotalAmount() <= 0) {
      this.notification.warning('Total amount must be greater than zero.');
      return;
    }

    this.isSaving = true;
    const formValue = this.salesForm.value;

    const dto = {
      invoiceNo: formValue.invoiceNo,
      customerId: formValue.customerId,
      invoiceDate: formValue.invoiceDate,
      remark: formValue.remark,
      items: formValue.items
    };

    this.salesService.create(dto).subscribe({
      next: () => {
        this.notification.success('Sales invoice created successfully!');
        this.router.navigate(['/sales']);
      },
      error: () => {
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/sales']);
  }
}