import { NgModule } from '@angular/core';
import { PAGES } from '../pages';
import { StaticFeatureRoutingModule } from './static.feature-routing.module';

@NgModule({
  declarations: [...PAGES],
  imports: [StaticFeatureRoutingModule]
})
export class StaticFeatureModule {}
