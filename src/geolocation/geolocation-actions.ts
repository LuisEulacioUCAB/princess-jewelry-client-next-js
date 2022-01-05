import { createAction } from '@cobuildlab/react-simple-state/lib/actions';
import axios from 'axios';
import { useEvent } from '@cobuildlab/react-simple-state';
import {
  fetchGeolocationEvent,
  fetchGeolocationErrorEvent,
  addGeolocationDataEvent,
  addGeolocationDataErrorEvent,
} from './geolocation-events';
import { client } from '../../shared/apollo';
import { CreateProductVisitDocument, CreateProductVisitInput, ProductVisitByIPv4Document } from '../gerated/types';


export const fetchGeolocation = createAction(
  fetchGeolocationEvent,
  fetchGeolocationErrorEvent, async ()=>{
    const response = await axios.get('http://localhost:3000/api/ip-address');
    const { data } = response;
    // eslint-disable-next-line no-unused-vars
    const { postal, ...rest }= data;
    
    return rest;
  }
);

export const addGeolocationData = createAction(
  addGeolocationDataEvent,
  addGeolocationDataErrorEvent,
  async (product_id:string)=>{
    const geolocation = fetchGeolocationEvent.get();

    const response = await client.query({
      query:ProductVisitByIPv4Document,
      variables:{
        IPv4: geolocation.IPv4
      }
    });

    const { productVisitByIPv4 } = response.data;

    if (!productVisitByIPv4){

      const data: CreateProductVisitInput = {
        ...geolocation,
        product_id
      };

      const res = await client.mutate({
        mutation: CreateProductVisitDocument,
        variables:{
          data
        }
      });

      const { createProductVisit } = res.data;

      console.log('createProductVisit', createProductVisit);

      return createProductVisit;
    }

    return productVisitByIPv4;
  }
);