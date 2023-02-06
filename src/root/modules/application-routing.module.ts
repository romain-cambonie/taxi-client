import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    loadChildren: async () => (await import('@features/static')).StaticFeatureModule,
    path: ''
  },
  {
    loadChildren: async () => (await import('@features/authentication')).AuthenticationFeatureModule,
    path: ''
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([...ROUTES])]
})
export class ApplicationRoutingModule {}
