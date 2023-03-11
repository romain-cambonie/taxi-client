import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { COMPONENTS } from '../components';
import { PAGES } from '../pages';
import { DashboardFeatureRoutingModule } from './dashboard.feature-routing.module';

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [CommonModule, DashboardFeatureRoutingModule]
})
export class DashboardFeatureModule {}
