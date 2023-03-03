import { Inject, Injectable } from '@angular/core';
import { CanMatch } from '@angular/router';
import { Session, SESSION_PERSISTENCE } from '../providers';

@Injectable()
export class CanMatchLoggedInGuard implements CanMatch {
  public constructor(@Inject(SESSION_PERSISTENCE) private readonly _session: Session) {}

  public canMatch = (): boolean => this._session.isLoggedIn;
}
