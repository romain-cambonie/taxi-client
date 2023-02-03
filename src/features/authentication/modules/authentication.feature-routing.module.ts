import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayout } from '../layouts';
import { ForgotPasswordPage, LoginPage, RegisterPage } from '../pages';

const ROUTES: Routes = [
  {
    children: [
      {
        component: LoginPage,
        path: 'login',
        data: { animation: 'LoginPage' }
      },
      {
        component: RegisterPage,
        path: 'register',
        data: { animation: 'RegisterPage' }
      },
      {
        component: ForgotPasswordPage,
        path: 'forgot-password',
        data: { animation: 'ForgotPasswordPage' }
      }
    ],
    component: AuthenticationLayout,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class AuthenticationFeatureRoutingModule {}
