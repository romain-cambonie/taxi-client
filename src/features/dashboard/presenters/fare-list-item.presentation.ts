export type FareStatus = 'finished' | 'subcontracted';

export type FareListItemPresentation = {
  id: string;
  date: string;
  distance: string;
  duration: string;
  status: FareStatus;
  time: string;
};
