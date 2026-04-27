import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;
  isLoading = false;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      address: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    if (this.customerId) {
      this.isEditMode = true;
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(id: number): void {
    this.isLoading = true;
    this.customerService.getById(id).subscribe({
      next: (response) => {
        const customer = response.data;
        this.customerForm.patchValue({
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
          isActive: customer.isActive
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) return;

    this.isSaving = true;
    const formValue = this.customerForm.value;

    if (this.isEditMode && this.customerId) {
      this.customerService.update(this.customerId, formValue).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: () => { this.isSaving = false; }
      });
    } else {
      this.customerService.create(formValue).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: () => { this.isSaving = false; }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}