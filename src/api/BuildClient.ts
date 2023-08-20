import fetch from 'node-fetch';
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache,
  type TokenStore,
  type ExistingTokenMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { store } from '../store';
import { changeCustomerState, changeTokenCache } from '../store/rootReducer';

class Cache implements TokenCache {
  get(): TokenStore {
    return store.getState().auth.tokenCache;
  }

  set(cache: TokenStore): void {
    store.dispatch(changeTokenCache(cache));
  }
}

const tokenCache = new Cache();

const projectKey = process.env.REACT_APP_PROJECT_KEY;
const scopes = [process.env.REACT_APP_SCOPES];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_AUTH_URL,
  projectKey: process.env.REACT_APP_PROJECT_KEY,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_API_URL,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.REACT_APP_PROJECT_KEY,
});

const options: PasswordAuthMiddlewareOptions = {
  host: process.env.REACT_APP_AUTH_URL,
  projectKey: process.env.REACT_APP_PROJECT_KEY,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    user: {
      username: '',
      password: '',
    },
  },
  scopes: scopes,
  tokenCache,
  fetch,
};

let customerClient: null | Client = null;

export let customerApiRoot: null | typeof apiRoot = null;

export const buildClientWithPasswordFlow = (
  username: string,
  password: string
) => {
  const client = new ClientBuilder()
    .withPasswordFlow({
      ...options,
      credentials: { ...options.credentials, user: { username, password } },
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  customerClient = client;
  customerApiRoot = createApiBuilderFromCtpClient(
    customerClient
  ).withProjectKey({ projectKey: process.env.REACT_APP_PROJECT_KEY });
};

export const buildClientWithTokenFlow = () => {
  const { tokenCache } = store.getState().auth;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  const client = new ClientBuilder()
    .withExistingTokenFlow(`Bearer ${tokenCache.refreshToken}`, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  customerClient = client;
  customerApiRoot = createApiBuilderFromCtpClient(
    customerClient
  ).withProjectKey({ projectKey: process.env.REACT_APP_PROJECT_KEY });

  store.dispatch(changeCustomerState(true));
};
