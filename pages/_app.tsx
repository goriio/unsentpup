import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer, Header } from '@/components';
import '@/styles/globals.css';
import toast, { Toaster } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState('');
  const { push } = useRouter();

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

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.length > 50) return;
    setSearch(value);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!search) {
      toast.error('Search input is empty');
      return;
    }
    push(`/search/${search}`);
    setSearch('');
  }

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
          <div className="flex justify-end w-full mb-8">
            <form className="relative" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="w-full md:w-auto pl-8 pr-4 py-2 border-none bg-slate-300 rounded-md"
                value={search}
                onChange={handleSearchChange}
                aria-label="Search"
                placeholder="Search for names, tags, or messages"
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-slate-700 ">
                <BiSearch />
              </span>
            </form>
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
