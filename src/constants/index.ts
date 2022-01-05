import { Currency } from '../gerated/types';

export const WORKSPACE_ID = process.env.REACT_APP_WORKSPACE_ID;
export const ENVIRONMENT_NAME = process.env.REACT_APP_ENVIRONMENT_NAME || '';
export const WORKSPACE_ENDPOINT = `https://api.8base.com/${WORKSPACE_ID}${
  ENVIRONMENT_NAME.toLowerCase() === 'master' || ENVIRONMENT_NAME === ''
    ? ''
    : `_${ENVIRONMENT_NAME}`
}`;
export const AUTH_PROFILE_ID = process.env.REACT_APP_AUTH0_PROFILE_ID;
export const AUTH0_SECRET_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
export const AUTH_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
export const AUTH_CLIENT_DOMAIN = process.env.REACT_APP_AUTH0_CLIENT_DOMAIN || '';
export const EIGHTBASE_WS_ENDPOINT = 'wss://ws.8base.com';
export const AUTH_CLIENT_REDIRECT_URI = '';
export const AUTH_CLIENT_REDIRECT_LOGOUT = '';
// export const AUTH_CLIENT_REDIRECT_URI = (typeof window.location.origin != 'undefined')?`${window.location.origin}/auth/callback`:'';
// export const AUTH_CLIENT_REDIRECT_LOGOUT = (typeof window.location.origin != 'undefined')?`${window.location.origin}/logout`:'';
export const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL ?? '';
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
export const AUTH0_SECRET = process.env.REACT_APP_AUTH0_SECRET ?? '';

export enum Roles {
  ADMINISTRATOR = 'ADMINISTRATOR',
  USER = 'USER',
}

interface Option{
  key: string | number;
  label: string;
}

export const CURRENCY:Option[] = [
  {
    key: Currency.Eur,
    label: '€'
  },
  {
    key: Currency.Usd,
    label: '$'
  }
];

export const DATETIME:Option[] = [
  {
    key: 'monthly',
    label: 'Monthly'
  },
  {
    key: 'weekly',
    label: 'Weekly'
  },
  {
    key: 'daily',
    label: 'Daily'
  },
  {
    key: 'annual',
    label: 'Annual'
  },
]