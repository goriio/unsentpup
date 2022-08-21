import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found | unsentpup</title>
      </Head>
      <section className="w-full my-20 text-gray-400 text-center">
        <h2 className="mb-4 font-semibold text-8xl">404</h2>
        <p className="text-lg">{'Page does not exist. :<'}</p>
        <Link href="/">
          <span className="text-blue-600 cursor-pointer text-sm">
            Go to homepage
          </span>
        </Link>
      </section>
    </>
  );
}
