import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer, Header, SearchBar } from '@/components';
import '@/styles/globals.css';
import { useEffect } from 'react';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    });

    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());

    return () => {
      Router.events.off('routeChangeStart', () => NProgress.start());
      Router.events.off('routeChangeComplete', () => NProgress.done());
      Router.events.off('routeChangeError', () => NProgress.done());
    };
  });

  return (
    <>
      <Head>
        <title>unsentpup</title>

        <meta name="title" content="unsentpup" />
        <meta name="description" content="💬 Unsent messages of PUPians" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="unsentpup" />
        <meta
          property="og:description"
          content="💬 Unsent messages of PUPians"
        />
        <meta property="og:image" content="/thumbnail.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="unsentpup" />
        <meta
          property="twitter:description"
          content="💬 Unsent messages of PUPians"
        />
        <meta property="twitter:image" content="/thumbnail.png" />

        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <main className="min-h-screen">
        <div className="container max-w-screen-lg mx-auto my-4 px-4">
          <div className="flex justify-end w-full mb-4">
            <SearchBar />
          </div>
          <Component {...pageProps} />
        </div>
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#334155',
            color: '#E5E7EB',
          },
        }}
      />
    </>
  );
}

export default MyApp;
