import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'items',
        loadComponent: () =>
          import('./features/items/items.component').then(m => m.ItemsComponent)
      },
      {
        path: 'items/new',
        loadComponent: () =>
          import('./features/items/item-form/item-form.component').then(m => m.ItemFormComponent)
      },
      {
        path: 'items/edit/:id',
        loadComponent: () =>
          import('./features/items/item-form/item-form.component').then(m => m.ItemFormComponent)
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/customers.component').then(m => m.CustomersComponent)
      },
      {
        path: 'customers/new',
        loadComponent: () =>
          import('./features/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent)
      },
      {
        path: 'customers/edit/:id',
        loadComponent: () =>
          import('./features/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent)
      },
      {
        path: 'suppliers',
        loadComponent: () =>
          import('./features/suppliers/suppliers.component').then(m => m.SuppliersComponent)
      },
      {
        path: 'suppliers/new',
        loadComponent: () =>
          import('./features/suppliers/supplier-form/supplier-form.component').then(m => m.SupplierFormComponent)
      },
      {
        path: 'suppliers/edit/:id',
        loadComponent: () =>
          import('./features/suppliers/supplier-form/supplier-form.component').then(m => m.SupplierFormComponent)
      },
      {
        path: 'locations',
        loadComponent: () =>
          import('./features/locations/locations.component').then(m => m.LocationsComponent)
      },
      {
        path: 'locations/new',
        loadComponent: () =>
          import('./features/locations/location-form/location-form.component').then(m => m.LocationFormComponent)
      },
      {
        path: 'locations/edit/:id',
        loadComponent: () =>
          import('./features/locations/location-form/location-form.component').then(m => m.LocationFormComponent)
      },
      {
        path: 'purchases',
        loadComponent: () =>
          import('./features/purchases/purchases.component').then(m => m.PurchasesComponent)
      },
      {
        path: 'purchases/new',
        loadComponent: () =>
          import('./features/purchases/purchase-form/purchase-form.component').then(m => m.PurchaseFormComponent)
      },
      {
        path: 'purchases/detail/:id',
        loadComponent: () =>
          import('./features/purchases/purchase-detail/purchase-detail.component').then(m => m.PurchaseDetailComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];