import { FareTransfer } from '../providers/factory';

export type FareStatus = 'finished' | 'subcontracted';

export type FareListItemPresentation = {
  id: string;
  date: string;
  distance: string;
  duration: string;
  status: FareStatus;
  time: string;
};

export const toFareListItemsPresentation = (fares: FareTransfer[]): FareListItemPresentation[] =>
  fares.map((fare: FareTransfer) => ({
    id: fare.rid,
    date: fare.date,
    distance: fare.distance,
    duration: fare.duration,
    status: fare.status as 'subcontracted' | 'finished',
    time: fare.time
  }));
