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
 