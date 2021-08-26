import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import App from "./components/App";
import { Config } from "./config";
import "./index.css";

const cache = new InMemoryCache({});

const GITHUB_BASE_URL = "https://api.github.com/graphql";

console.log(process.env.GITHUB_SECRET_KEY);

const httplink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${Config.GITHUB_TOKEN_SECRET}`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error] : Message : ${message}, Location : ${locations}, Path : ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network Error] : ${networkError}`);
  }
});

const link = ApolloLink.from([errorLink, httplink]);

const client: any = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <div
      style={{
        backgroundColor: "#0D1117",
      }}
    >
      <App />
    </div>
  </ApolloProvider>,
  document.getElementById("root")
);
