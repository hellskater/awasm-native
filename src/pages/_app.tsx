import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import NextProgress from 'next-progress';

import store from '../store';
import Layout from '@components/Layout';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <>
          {/* <PageLoading /> */}
          <NextProgress delay={300} options={{ showSpinner: false }} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </Provider>
  );
}
