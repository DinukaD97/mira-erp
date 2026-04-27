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
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-supplier-form',
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
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss'
})
export class SupplierFormComponent implements OnInit {
  supplierForm: FormGroup;
  isEditMode = false;
  supplierId: number | null = null;
  isLoading = false;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      address: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.supplierId = this.route.snapshot.params['id'];
    if (this.supplierId) {
      this.isEditMode = true;
      this.loadSupplier(this.supplierId);
    }
  }

  loadSupplier(id: number): void {
    this.isLoading = true;
    this.supplierService.getById(id).subscribe({
      next: (response) => {
        const supplier = response.data;
        this.supplierForm.patchValue({
          name: supplier.name,
          phone: supplier.phone,
          email: supplier.email,
          address: supplier.address,
          isActive: supplier.isActive
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) return;

    this.isSaving = true;
    const formValue = this.supplierForm.value;

    if (this.isEditMode && this.supplierId) {
      this.supplierService.update(this.supplierId, formValue).subscribe({
        next: () => this.router.navigate(['/suppliers']),
        error: () => { this.isSaving = false; }
      });
    } else {
      this.supplierService.create(formValue).subscribe({
        next: () => this.router.navigate(['/suppliers']),
        error: () => { this.isSaving = false; }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/suppliers']);
  }
}