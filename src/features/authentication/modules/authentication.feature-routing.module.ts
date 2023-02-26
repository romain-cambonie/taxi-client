import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayout } from '../layouts';
import { ActivatePage, ForgotPasswordPage, LoginPage, RegisterPage } from '../pages';

const ROUTES: Routes = [
  {
    children: [
      {
        component: LoginPage,
        path: 'login',
        title: 'Taxi Gestion - Connexion',
        data: { animation: 'LoginPage' }
      },
      {
        component: RegisterPage,
        path: 'register',
        title: 'Taxi Gestion - Créez votre compte',
        data: { animation: 'RegisterPage' }
      },
      {
        component: ForgotPasswordPage,
        path: 'forgot-password',
        title: 'Taxi Gestion - Réinitialisation du mot de passe',
        data: { animation: 'ForgotPasswordPage' }
      },
      {
        component: ActivatePage,
        path: 'activate',
        title: 'Taxi Gestion - Activation de votre compte',
        data: { animation: 'ActivatePage' }
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
