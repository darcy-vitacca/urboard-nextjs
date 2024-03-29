// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import superjson from "superjson";
import type { AppType } from "next/app";
import type { AppRouter } from "../server/router";
import type { Session } from "next-auth";
import "../styles/globals.css";

import Layout from "../components/layout";
import { FolderProvider } from "../context/folder-context";
import { ReactQueryDevtools } from "react-query/devtools";
import ReactGA from "react-ga4";
import Script from "next/script";

// ReactGA.initialize(
//   process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID ?? ""
// );

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>


      <FolderProvider>
        <Layout>
          {process.env.NODE_ENV !== "production" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <Component {...pageProps} />
        </Layout>
      </FolderProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""; // browser should use relative url
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  }
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      queryClientConfig: {
        defaultOptions: { queries: { refetchOnMount: false } },
      },
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
