import { ErrorComponent } from './error/error.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'towers'
  },
  {
    path: 'towers',
    loadChildren: () => import('towers/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
