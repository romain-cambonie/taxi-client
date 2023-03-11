import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FareByDayPresentation, FareStatus } from '../../presentation';

type FareTransfer = {
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

const toFareByDayPresentation = (fares: FareTransfer[]): FareByDayPresentation[] =>
  fares.map((fare: FareTransfer) => ({
    id: fare.rid,
    date: fare.date,
    distance: fare.distance,
    duration: fare.duration,
    status: fare.status as FareStatus,
    startTime: fare.time
  }));

export const faresByDayRead$ = (httpClient: HttpClient) => (): Observable<FareByDayPresentation[]> =>
  httpClient.get<FareTransfer[]>('/api/fares/2019-03-05').pipe(map(toFareByDayPresentation));
