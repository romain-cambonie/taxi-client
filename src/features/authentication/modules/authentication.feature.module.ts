import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIRECTIVES } from '../directives';
import { LAYOUTS } from '../layouts';
import { PAGES } from '../pages';
import { AuthenticationFeatureRoutingModule } from './authentication.feature-routing.module';

@NgModule({
  declarations: [...DIRECTIVES, ...LAYOUTS, ...PAGES],
  imports: [CommonModule, AuthenticationFeatureRoutingModule]
})
export class AuthenticationFeatureModule {}
