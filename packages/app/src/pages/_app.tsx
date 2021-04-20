import React from "react";
import "../styles/tailwind.output.css";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../graphql/apollo/ApolloClient";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const LandLordApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default LandLordApp;
