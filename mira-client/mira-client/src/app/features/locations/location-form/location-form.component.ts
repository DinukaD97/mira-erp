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
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-location-form',
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
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss'
})
export class LocationFormComponent implements OnInit {
  locationForm: FormGroup;
  isEditMode = false;
  locationId: number | null = null;
  isLoading = false;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.locationForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      remark: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.params['id'];
    if (this.locationId) {
      this.isEditMode = true;
      this.loadLocation(this.locationId);
    }
  }

  loadLocation(id: number): void {
    this.isLoading = true;
    this.locationService.getById(id).subscribe({
      next: (response) => {
        const location = response.data;
        this.locationForm.patchValue({
          code: location.code,
          name: location.name,
          remark: location.remark,
          isActive: location.isActive
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.locationForm.invalid) return;

    this.isSaving = true;
    const formValue = this.locationForm.value;

    if (this.isEditMode && this.locationId) {
      this.locationService.update(this.locationId, formValue).subscribe({
        next: () => this.router.navigate(['/locations']),
        error: () => { this.isSaving = false; }
      });
    } else {
      this.locationService.create(formValue).subscribe({
        next: () => this.router.navigate(['/locations']),
        error: () => { this.isSaving = false; }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/locations']);
  }
}