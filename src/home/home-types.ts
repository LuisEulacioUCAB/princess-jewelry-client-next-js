import {ArrayElement} from '../../shared/utils/types';
import { HomeQuery , SubscriptionsQuery} from '../gerated/types';

export type HomeRingItem = ArrayElement<HomeQuery['rings']['data']>;
export type HomeEarringItem = ArrayElement<HomeQuery['earrings']['data']>;
export type HomeNecklaceItem = ArrayElement<HomeQuery['necklaces']['data']>;