import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { BACKEND_URL } from '../src/constants';
import { OnTokenEvent, OnTokenErrorEvent } from '../src/events/token-event';

console.log('apollo:BACKEND_URL',BACKEND_URL);
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const customFetch = (uri: string, options: any) => fetch(uri, options);

export const httpLink = createHttpLink({
  uri: BACKEND_URL,
  fetchOptions: {
    method: 'POST',
  },
  fetch: customFetch,
});

export const uploadHttpLink = createUploadLink({
  uri: BACKEND_URL,
});

export const errorLink = onError((error) => {
  if (error.graphQLErrors) {
    // eslint-disable-next-line no-param-reassign
    error.graphQLErrors = error.graphQLErrors.map((options) => {
      if (options.message === 'Token expired') {
        /**
         * This timeout is to wait for the toast to display
         * the session expires message and then logout.
         */
        setTimeout(() => OnTokenErrorEvent.dispatch(options.message as unknown as Error), 2000);

        return { ...options, message: 'Your session has expired' };
      }

      return options;
    });
  }

  if (error.response) {
    // eslint-disable-next-line no-param-reassign
    error.response.errors = error.response.errors?.map((options) => {
      if (options.message === 'Token expired') {
        /**
         * This timeout is to wait for the toast to display
         * the session expires message and then logout.
         */
        setTimeout(() => OnTokenErrorEvent.dispatch(options.message as unknown as Error), 2000);

        return { ...options, message: 'Your session has expired' };
      }

      return options;
    });
  }
});

export const authLink = setContext((_, { headers }) => {
  // get the authentication token from event storage if it exists
  // eslint-disable-next-line no-unused-vars
  const event = OnTokenEvent.get();
  // return the headers to the context so httpLink can read them
  console.log('event', event);
  return {
    headers: {
      ...headers,
      authorization: event && event.token ? `Bearer ${event.token}` : '',
    },
  };
});

const link = from([authLink, errorLink, httpLink]);
const uploadLink = from([authLink, errorLink, uploadHttpLink]);

/**
 * Import client directly in the actions
 * it's not necessary to add to the event store.
 *
 * If the client is required in a component use the apollo hooks o HOC.
 */
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

/**
 * Import upload client directly in the actions
 * it's not necessary to add to the event store.
 *
 * If the client is required in a component use the apollo hooks o HOC.
 */
export const uploadClient = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});
