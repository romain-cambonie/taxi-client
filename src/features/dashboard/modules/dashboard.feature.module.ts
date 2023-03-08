import { NgModule } from '@angular/core';
import { PAGES } from '../pages';
import { DashboardFeatureRoutingModule } from './dashboard.feature-routing.module';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from '../components';

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [CommonModule, DashboardFeatureRoutingModule]
})
export class DashboardFeatureModule {}
