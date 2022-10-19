import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import NextProgress from 'next-progress';

import store from '../store';
import Layout from '@components/Layout';

const queryClient = new QueryClient();

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <>
            {/* <PageLoading /> */}
            <NextProgress delay={300} options={{ showSpinner: false }} />
            <SessionProvider session={session}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </MantineProvider>
    </Provider>
  );
}
