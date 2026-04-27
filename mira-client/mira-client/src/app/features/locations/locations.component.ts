import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LocationService } from '../../core/services/location.service';
import { LocationModel } from '../../core/models/location.model';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent implements OnInit {
  locations: LocationModel[] = [];
  displayedColumns = ['code', 'name', 'remark', 'status', 'actions'];
  isLoading = false;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.isLoading = true;
    this.locationService.getAll().subscribe({
      next: (response) => {
        this.locations = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addNew(): void {
    this.router.navigate(['/locations/new']);
  }

  edit(id: number): void {
    this.router.navigate(['/locations/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this location?')) {
      this.locationService.delete(id).subscribe({
        next: () => this.loadLocations()
      });
    }
  }
}