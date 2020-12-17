import { getAccessToken, setAccessToken } from "../lib/accesToken";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import jwtDecode from "jwt-decode";

import { TokenRefreshLink } from "apollo-link-token-refresh";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : "",
    },
  };
});

const requestLink = authLink.concat(httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (!token) {
          return true;
        }
        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch (err) {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch(process.env.REACT_APP_REFRESH_TOKEN, {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    requestLink,
  ]),
});

export default client;
