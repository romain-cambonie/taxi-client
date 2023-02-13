import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DIRECTIVES } from '../directives';
import { LAYOUTS } from '../layouts';
import { PAGES } from '../pages';
import { COMPONENTS } from '../components';
import { ACCOUNTS_PERSISTENCE, accountsValueProvider, registerFactoryProvider } from '../providers';
import { inMemoryRegisterAction } from '../actions';
import { AuthenticationFeatureRoutingModule } from './authentication.feature-routing.module';

@NgModule({
  declarations: [...DIRECTIVES, ...LAYOUTS, ...PAGES, ...COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, AuthenticationFeatureRoutingModule],
  providers: [accountsValueProvider(), registerFactoryProvider(inMemoryRegisterAction, [ACCOUNTS_PERSISTENCE])]
})
export class AuthenticationFeatureModule {}
