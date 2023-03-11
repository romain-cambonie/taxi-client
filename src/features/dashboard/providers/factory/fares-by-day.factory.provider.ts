import { FactoryProvider } from '@angular/core';
import { Observable } from 'rxjs';

export type FaresByDayAction<T> = () => Observable<T>;

export const FARES_BY_DAY_ACTION = 'dashboard.fares-by-day.action' as const;

export const faresByDayFactoryProvider = <TDependencies, TResult>(
  useFactory: (...providers: never[]) => FaresByDayAction<TResult>,
  deps: TDependencies[] = []
): FactoryProvider => ({
  provide: FARES_BY_DAY_ACTION,
  useFactory,
  deps
});

export type FareTransfer = {
  rid: string;
  created_at: string;
  creator: string;
  date: string;
  distance: string;
  duration: string;
  in_has_entry: string;
  in_has_fare: string;
  isreturn: string;
  locked: string;
  meters: string;
  out_has_invoice: string;
  recurrent: string;
  status: string;
  subcontractor: string;
  time: string;
  timestamp: string;
  updated_at: string;
  weeklyrecurrence: string;
};
