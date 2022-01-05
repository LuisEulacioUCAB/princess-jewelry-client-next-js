import { createAction } from '@cobuildlab/react-simple-state/lib/actions';
import {
  fetchLatestUsersErrorEvent,
  fetchLatestUsersEvent,
  fetchUserErrorEvent,
  fetchUserEvent, fetchUserRegisterAnalyticsErrorEvent, fetchUserRegisterAnalyticsEvent,
  fetchUsersErrorEvent,
  fetchUsersEvent, updateUserErrorEvent,
  updateUserEvent,
} from './user-events';
import { client } from '../../../shared/apollo';
import {
  ProductVisitByDateDocument,
  QueryUsersOrderByColumn,
  SortOrder,
  UpdateUserDocument,
  UpdateUserInput,
  UserByEmailDocument, UserRegisterAnalyticsDocument,
  UsersDocument,
} from '../../gerated/types';
import { getPageFilters } from '../../../shared/utils/pagination';
import { fetchProductGraphErrorEvent, fetchProductGraphEvent } from '../products/product-events';
import { ProductItem } from '../products/product-types';
import moment from 'moment';

export const fetchUsers = createAction(
  fetchUsersEvent,
  fetchUsersErrorEvent,async (page: number, pageSize: number)=>{
    const response = await client.query({
      query: UsersDocument,
      variables:{
        ...getPageFilters(page, pageSize) 
      }
    });
    
    const { paginatorInfo, data} =response.data.users;
    
    return {
      users: data, 
      count: paginatorInfo.total
    };
  }
);

export const fetchUser = createAction(
  fetchUserEvent,
  fetchUserErrorEvent,
  async (email:string)=>{
    const response = await client.query({
      query: UserByEmailDocument,
      variables:{
        email
      }
    });

    return response.data.userByEmail;
  }
);

export const updateUser = createAction(
  updateUserEvent,
  updateUserErrorEvent,
  async (data: UpdateUserInput)=>{
    const response = await client.mutate({
      mutation: UpdateUserDocument,
      variables:{
        data
      }
    });

    return response.data.updateUser;

  }
);

export const fetchLatestUsers = createAction(
  fetchLatestUsersEvent,
  fetchLatestUsersErrorEvent, async(page: number, pageSize: number)=>{

    const response = await client.query({
      query: UsersDocument,
      variables:{
        ...getPageFilters(page,pageSize),
        orderBy:[
          {
            order:SortOrder.Desc,
            column:QueryUsersOrderByColumn.CreatedAt
          }
        ]
      },
      fetchPolicy:'network-only'
    });

    const { data , paginatorInfo } = response.data.users;
    return {
      users: data,
      count: paginatorInfo.total
    };
  }
);

export const fetchUserRegisterAnalytics = createAction(
  fetchUserRegisterAnalyticsEvent,
  fetchUserRegisterAnalyticsErrorEvent, async (period: string)=>{

    let startDate = null;
    let endDate = null;
    let diffDate = null;
    let formatDate = null;
    const categories = [];

    if(period === 'monthly'){
      diffDate = 'days';
      startDate = moment().startOf('month');
      endDate = moment().endOf('month');
      formatDate = 'D';
    }else if(period === 'weekly'){
      diffDate = 'days';
      startDate = moment().startOf('week');
      endDate = moment().endOf('week');
      formatDate = 'D';
    }else if(period === 'daily'){
      diffDate = 'hours';
      startDate = moment().startOf('day');
      endDate = moment().endOf('day');
      formatDate = 'HH:ss';
    }else if(period === 'annual') {
      diffDate = 'months';
      startDate = moment().startOf('year');
      endDate = moment().endOf('year');
      formatDate = 'MMM';
    }

    const diff = moment(endDate).diff(startDate, diffDate);

    // eslint-disable-next-line no-plusplus
    for(let i=0; i <=diff; i++){
      const newStartDate = moment(startDate).add(i, diffDate).utc().format();
      categories.push(
        moment(newStartDate).locale('es').format(formatDate)
      );
    }

    const response = await client.query({
      query: UserRegisterAnalyticsDocument,
      variables: {
        period
      }
    });

    const { data } = response.data.userRegisterAnalytics;

    return {
      data,
      startDate: moment(startDate).format('LLL'),
      endDate: moment(endDate).format('LLL'),
      categories
    };
  }
);