import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { REDIRECT_ROUTES_PERSISTENCE, RedirectRoutesKeys, Session, SESSION_PERSISTENCE } from '@features/authentication';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main.layout.html'
})
export class MainLayout {
  public constructor(
    @Inject(SESSION_PERSISTENCE) private readonly _session: Session,
    @Inject(REDIRECT_ROUTES_PERSISTENCE) private readonly _toRoutes: Map<RedirectRoutesKeys, string>,
    private readonly _router: Router
  ) {}

  public onLogout(): void {
    this._session.isLoggedIn = false;
    this._router.navigate([this._toRoutes.get('logout')], { onSameUrlNavigation: 'reload' });
  }
}
