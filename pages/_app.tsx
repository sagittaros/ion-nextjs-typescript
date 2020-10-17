// This is needed for global styles
// https://nextjs.org/learn/basics/assets-metadata-css/global-styles

import dynamic from "next/dynamic";
import Head from "next/head";
import "../styles/globals.css";

const SignalProvider = dynamic(
  () =>
    import("../contexts/signal_provider").then(
      (module) => module.SignalProvider
    ),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ion NextJS typescript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignalProvider backend={process.env.NEXT_PUBLIC_ION_BACKEND}>
        <Component {...pageProps} />
      </SignalProvider>
    </>
  );
}

export default MyApp;
