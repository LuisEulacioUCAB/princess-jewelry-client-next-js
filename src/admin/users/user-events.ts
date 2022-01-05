import { createEvent } from '@cobuildlab/react-simple-state';
import { UserListItem } from './user-types';
import { UpdateUserMutation } from '../../gerated/types';

export const fetchUsersEvent = createEvent<{ users:UserListItem[], count: number }>({
  initialValue:{
    users:[],
    count: 0
  }
});

export const fetchUsersErrorEvent = createEvent<Error>();

export const fetchUserEvent = createEvent<UserListItem | undefined>({
  initialValue: undefined
});

export const fetchUserErrorEvent = createEvent<Error>();

export const updateUserEvent = createEvent<UpdateUserMutation['updateUser'] | undefined>({
  initialValue: undefined
});
export const updateUserErrorEvent = createEvent<Error>();

export const fetchLatestUsersEvent = createEvent<{ users:UserListItem[], count: number }>({
  initialValue:{
    users:[],
    count: 0
  }
});

export const fetchLatestUsersErrorEvent = createEvent<Error>();

export const fetchUserRegisterAnalyticsEvent = createEvent<{
  data:number[];
  startDate: string;
  endDate : string;
  categories : string[]
}>({
  initialValue:{
    data:[],
    startDate:'',
    endDate:'',
    categories:[]
  }
});

export const fetchUserRegisterAnalyticsErrorEvent = createEvent<Error>();