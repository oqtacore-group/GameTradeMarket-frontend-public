import events from 'events';

import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  split,
  from,
  HttpLink,
  empty,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { authRoutes } from '../../router';
import { sendReportError } from '../../utils/send-report-error';

export const GlobalEventEmitter = new events.EventEmitter();

const settings = {
  GQ_URL:
    process.env.NEXT_PUBLIC_LOCAL === 'true'
      ? process.env.NEXT_PUBLIC_GQ_URL_LOCAL
      : process.env.NEXT_PUBLIC_GQ_URL,
  WS_URL:
    process.env.NEXT_PUBLIC_LOCAL === 'true'
      ? process.env.NEXT_PUBLIC_WS_URL_LOCAL
      : process.env.NEXT_PUBLIC_WS_URL,
  WEBSOCKET_RECONNECTION_ATTEMPTS: 0,
};

const memoWSLink = () => {
  let prevStringifyParams = '';
  let result: any;

  return (uri?: string, token?: string, reconnectionAttempts?: number) => {
    const stringifyParams = `${uri}${token}${reconnectionAttempts}`;
    if (stringifyParams !== prevStringifyParams) {
      prevStringifyParams = stringifyParams;
      result =
        uri && token
          ? new WebSocketLink({
              uri,
              options: {
                lazy: true,
                reconnect: true,
                reconnectionAttempts,
              },
              connectionParams: {
                token,
              },
            })
          : empty();
    }
    return result;
  };
};
const getWSLink = memoWSLink();

const getHttpLink = (uri: string) => new HttpLink({ uri });

const authMiddleware = (token: string | undefined) =>
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token,
      },
      fetchOptions: {
        credentials: 'include',
      },
    }));
    return forward(operation);
  });

const invalidToken = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response?.errors && response?.errors[0]?.message === '403') {
      GlobalEventEmitter.emit('refresh403');
    }
    if (response?.errors && response?.errors[0]?.message === '401') {
      // resetAuthLocalStorage();
      GlobalEventEmitter.emit('logout401');
    }
    return response;
  });
});

const errorLink = onError(({ networkError, graphQLErrors, response, operation }: any) => {
  if (operation.operationName === 'IgnoreErrorsQuery') {
    response.errors = null;
  }

  let textReport = '';

  if (graphQLErrors) {
    graphQLErrors.forEach(async ({ message, code }: any) => {
      textReport = textReport + 'code: ' + code + ' ' + message;
      console.error(`
        [GraphQL error]: operation ${operation?.operationName || '?'},
        Code: ${code || '?'},
        Message: ${message || '?'}
      `);
    });
  }

  if (networkError) {
    textReport =
      textReport + ` [Network error]: ${networkError} [operationName]: ${operation.operationName}`;
    console.error(`
      [Network error]: ${networkError}
      [operationName]: ${operation.operationName}
    `);
  }
  if (typeof window !== 'undefined' && window.location.href)
    sendReportError(window.location.href, textReport);
});

// multiple clients
const directionalMiddleware = (token: string | undefined) => {
  const minReconnectionAttempts = 0;
  const maxReconnectionAttempts = Infinity;
  const settingsReconnectionAttempts = `${settings?.WEBSOCKET_RECONNECTION_ATTEMPTS}`;
  const preparedSettingsReconnectionAttempts =
    settingsReconnectionAttempts.toLowerCase() === 'infinity'
      ? Infinity
      : parseInt(settingsReconnectionAttempts) || 0;
  const resultReconnectionAttempts = Math.min(
    maxReconnectionAttempts,
    Math.max(minReconnectionAttempts, preparedSettingsReconnectionAttempts)
  );

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return Boolean(
        definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription' &&
          settings.WS_URL
      );
    },
    getWSLink(settings.WS_URL, token, resultReconnectionAttempts),
    getHttpLink(settings.GQ_URL as string)
  );
};

const client = new ApolloClient({
  credentials: 'include',
  link: from([
    invalidToken,
    errorLink,
    authMiddleware(
      typeof window !== 'undefined' ? (localStorage.getItem('token') as string) : undefined
    ),
    directionalMiddleware(
      typeof window !== 'undefined' ? (localStorage.getItem('token') as string) : undefined
    ),
  ]),
  cache: new InMemoryCache(),
  ssrMode: false,
});

export const setLink = (token: string | undefined) => {
  client.setLink(
    from([invalidToken, errorLink, authMiddleware(token), directionalMiddleware(token)])
  );
};

export const api = client;

export const logout = async () => {
  resetAuthLocalStorage();

  localStorage.removeItem('token');
  if (authRoutes.includes(location.pathname)) location.replace(`/?login=true`);

  setTimeout(async () => {
    await api.clearStore();
    location.reload();
  }, 3000);
};

export const resetAuthLocalStorage = () => {
  if (typeof window !== 'undefined') {
    if (localStorage) {
      localStorage.removeItem('token');
    }
    if (sessionStorage) {
      sessionStorage.removeItem('token');
    }
  }
};
