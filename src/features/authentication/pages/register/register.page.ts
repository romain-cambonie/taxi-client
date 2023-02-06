import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.page.html'
})
export class RegisterPage {}
