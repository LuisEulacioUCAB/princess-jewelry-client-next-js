import { createAction } from '@cobuildlab/react-simple-state/lib/actions';
import { createSubscriptionErrorEvent, createSubscriptionEvent } from './subscription-events';
import { client } from '../../shared/apollo';
import { CreateSubscriptionDocument } from '../gerated/types';


export const createSubscription = createAction(
  createSubscriptionEvent,
  createSubscriptionErrorEvent,
  async (email: string)=>{
    const response = await client.mutate({
      mutation: CreateSubscriptionDocument,
      variables:{
        data:{ email }
      }
    });

    return response.data.createSubscription;
  }
);