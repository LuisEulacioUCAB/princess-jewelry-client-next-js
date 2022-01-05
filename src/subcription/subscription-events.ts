import { createEvent } from '@cobuildlab/react-simple-state';
import { CreateSubscriptionMutation } from '../gerated/types';


export const createSubscriptionEvent = createEvent<CreateSubscriptionMutation['createSubscription']>({
  initialValue: undefined
});

export const createSubscriptionErrorEvent = createEvent<Error>();