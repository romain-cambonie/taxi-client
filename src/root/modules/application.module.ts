import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationRootLayout } from '../layouts';
import { ApplicationRoutingModule } from './application-routing.module';

@NgModule({
  declarations: [ApplicationRootLayout],
  imports: [BrowserAnimationsModule, ApplicationRoutingModule],
  bootstrap: [ApplicationRootLayout]
})
export class ApplicationModule {}
