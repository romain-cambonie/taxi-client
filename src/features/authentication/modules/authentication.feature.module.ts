import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DIRECTIVES } from '../directives';
import { LAYOUTS } from '../layouts';
import { PAGES } from '../pages';
import { COMPONENTS } from '../components';
import { PIPES } from '../pipes';
import {
  ACCOUNTS_PERSISTENCE,
  accountsValueProvider,
  fieldErrorMessagesValueProvider,
  registerFactoryProvider
} from '../providers';
import { inMemoryRegisterAction } from '../actions';
import { ERROR_MESSAGES } from '../presentation';
import { AuthenticationFeatureRoutingModule } from './authentication.feature-routing.module';

@NgModule({
  declarations: [...DIRECTIVES, ...LAYOUTS, ...PAGES, ...COMPONENTS, ...PIPES],
  imports: [CommonModule, ReactiveFormsModule, AuthenticationFeatureRoutingModule],
  providers: [
    accountsValueProvider(),
    registerFactoryProvider(inMemoryRegisterAction, [ACCOUNTS_PERSISTENCE]),
    fieldErrorMessagesValueProvider(ERROR_MESSAGES)
  ]
})
export class AuthenticationFeatureModule {}
