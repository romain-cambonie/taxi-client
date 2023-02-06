import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.page.html'
})
export class LoginPage {}
