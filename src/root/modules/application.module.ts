import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CanMatchGuestGuard,
  CanMatchLoggedInGuard,
  sessionValueProvider,
  RedirectRoutesKeys,
  redirectRoutesValueProvider
} from '@features/authentication';
import { ApplicationRootLayout, LAYOUTS } from '../layouts';
import { COMPONENTS } from '../components';
import { ApplicationRoutingModule } from './application-routing.module';

const redirectToRoutes: Map<RedirectRoutesKeys, string> = new Map<RedirectRoutesKeys, string>([
  ['activate', '/login'],
  ['register', '/activate'],
  ['login', '/'],
  ['logout', '/']
]);

@NgModule({
  declarations: [...LAYOUTS, ...COMPONENTS],
  imports: [BrowserAnimationsModule, HttpClientModule, ApplicationRoutingModule],
  bootstrap: [ApplicationRootLayout],
  providers: [CanMatchGuestGuard, CanMatchLoggedInGuard, sessionValueProvider(), redirectRoutesValueProvider(redirectToRoutes)]
})
export class ApplicationModule {}
