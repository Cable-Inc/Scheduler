/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from "react";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import { onError } from "apollo-link-error";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import apolloLogger from "apollo-link-logger";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const uri =
  process.env.NEXT_PUBLIC_API_ENDPOINT_URL ??
  "https://us-central1-cable-scheduler.cloudfunctions.net/nextjs-server/api/graphql";

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([
      apolloLogger,
      (errorLink as unknown) as ApolloLink,
      new HttpLink({
        uri, // Server URL (must be absolute)
        credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState?: NormalizedCacheObject): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any): any {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
