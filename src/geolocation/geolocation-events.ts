import { createEvent } from '@cobuildlab/react-simple-state';
import { Geolocation, ProductVisitListItem } from './geolocation-types';


export const fetchGeolocationEvent = createEvent<Geolocation| undefined>({
  initialValue:undefined
});

export const fetchGeolocationErrorEvent = createEvent<Error>();

export const addGeolocationDataEvent = createEvent<ProductVisitListItem>({
  initialValue: undefined
});

export const addGeolocationDataErrorEvent = createEvent<Error>();
