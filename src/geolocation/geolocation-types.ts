import { ArrayElement } from '../../shared/utils/types';
import { ProductVisitsQuery } from '../gerated/types';


export interface Geolocation{
  country_code:string;
  country_name:string;
  city:string;
  latitude:number;
  longitude:number;
  IPv4:string;
  state:string;
}

export type ProductVisitListItem = ArrayElement<ProductVisitsQuery['productVisits']['data']>