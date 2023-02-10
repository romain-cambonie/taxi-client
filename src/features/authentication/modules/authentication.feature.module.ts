import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DIRECTIVES } from '../directives';
import { LAYOUTS } from '../layouts';
import { PAGES } from '../pages';
import { setRegisterFactory } from '../providers';
import { inMemoryRegisterFactory } from '../factories/in-memory';
import { AuthenticationFeatureRoutingModule } from './authentication.feature-routing.module';

@NgModule({
  declarations: [...DIRECTIVES, ...LAYOUTS, ...PAGES],
  imports: [CommonModule, ReactiveFormsModule, AuthenticationFeatureRoutingModule],
  providers: [setRegisterFactory(inMemoryRegisterFactory)]
})
export class AuthenticationFeatureModule {}
