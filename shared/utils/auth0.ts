import { initAuth0 } from '@auth0/nextjs-auth0';
import {
  AUTH_CLIENT_ID,
  AUTH_CLIENT_DOMAIN,
  AUTH_PROFILE_ID,
  REDIRECT_URL,
  AUTH0_SECRET
} from '../../src/constants';

console.log('AUTH_CLIENT_DOMAIN', AUTH_CLIENT_DOMAIN);
console.log('AUTH_CLIENT_ID', AUTH_CLIENT_ID);
console.log('AUTH_PROFILE_ID', AUTH_PROFILE_ID);
console.log('REDIRECT_URL', REDIRECT_URL);
console.log('AUTH0_SECRET', AUTH0_SECRET);


export default initAuth0({
  issuerBaseURL: `https://${AUTH_CLIENT_DOMAIN}`,
  clientID: AUTH_CLIENT_ID,
  clientSecret: AUTH_PROFILE_ID,
  baseURL: REDIRECT_URL,
  routes: {
    postLogoutRedirect: REDIRECT_URL,
    callback: '/api/auth/callback',
  },
  secret: AUTH0_SECRET,
  session: {
    absoluteDuration: 60 * 60 * 8,
    rollingDuration: 60 * 60,
    rolling: true,
  },
  httpTimeout: 5000,
  clockTolerance: 10000,
});