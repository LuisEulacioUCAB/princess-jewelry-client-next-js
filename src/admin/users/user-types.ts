import { ArrayElement } from '../../../shared/utils/types';
import { UsersQuery } from '../../gerated/types';

export type UserListItem = ArrayElement<UsersQuery['users']['data']>