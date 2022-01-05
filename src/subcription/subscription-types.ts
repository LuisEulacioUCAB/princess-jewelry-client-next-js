import { SubscriptionsQuery} from '../gerated/types';
import { ArrayElement } from '../../shared/utils/types';

export type SubscriptionListItem = ArrayElement<SubscriptionsQuery['subscriptions']['data']> 