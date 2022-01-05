import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { BACKEND_URL } from '../constants';
import { OnTokenEvent } from '../events/token-event';

/**
 * @param {Function} getToken - Function to get the token.
 * @param {object} headers - Extra header to the client.
 * @returns {object} Apollo client.
 */
export function createApolloClient(
  getToken: () => string,
  headers = {},
): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: BACKEND_URL,
  });

  const authLink = setContext((_, { headers: _headers }) => ({
    headers: {
      ...headers,
      ..._headers,
      authorization: `Bearer ${getToken()}`,
    },
  }));
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    authLink.concat(httpLink),
  );

  return new ApolloClient({
    uri: BACKEND_URL,
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });
}

export const client = createApolloClient(
  () => OnTokenEvent.get()?.token as string,
);
