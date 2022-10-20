import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import NextProgress from 'next-progress';
import '@tremor/react/dist/esm/tremor.css';

import Layout from '@components/Layout';
import store from '../store';
import '../styles/globals.css';

// React query client
const queryClient = new QueryClient();

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    // Redux provider
    <Provider store={store}>
      {/* Mantine UI library global Provider */}
      <MantineProvider withGlobalStyles withNormalizeCSS>
        {/* React Query provider */}
        <QueryClientProvider client={queryClient}>
          <>
            {/* Page loading indicator */}
            <NextProgress delay={300} options={{ showSpinner: false }} />
            {/* Provider that enables useSession() hook */}
            <SessionProvider session={session}>
              {/* Common wrapper for all the components for common styling and configs */}
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
