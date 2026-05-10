import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong. Please try again.';

      switch (error.status) {
        case 0:
          message = 'Cannot connect to server. Please check if the API is running.';
          break;
        case 400:
          message = error.error?.message || 'Invalid request. Please check your input.';
          break;
        case 401:
          message = 'Session expired. Please log in again.';
          router.navigate(['/login']);
          break;
        case 403:
          message = 'You do not have permission to perform this action.';
          break;
        case 404:
          message = 'The requested resource was not found.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = error.error?.message || 'An unexpected error occurred.';
      }

      notificationService.error(message);
      return throwError(() => error);
    })
  );
};