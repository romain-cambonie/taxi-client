import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CanMatchGuestGuard, CanMatchLoggedInGuard } from '@features/authentication';
import { MainLayout } from '../layouts';

const ROUTES: Routes = [
  {
    loadChildren: async () => (await import('@features/public')).PublicFeatureModule,
    path: '',
    canMatch: [CanMatchGuestGuard]
  },
  {
    loadChildren: async () => (await import('@features/dashboard')).DashboardFeatureModule,
    component: MainLayout,
    path: '',
    canMatch: [CanMatchLoggedInGuard]
  },
  {
    loadChildren: async () => (await import('@features/authentication')).AuthenticationFeatureModule,
    path: '',
    canMatch: [CanMatchGuestGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([...ROUTES])]
})
export class ApplicationRoutingModule {}
