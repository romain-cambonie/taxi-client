import { faresByDayRead$, faresByDayReadProvider } from '@features/planning';

export const PLANNING_PROVIDERS = [faresByDayReadProvider(faresByDayRead$)];
