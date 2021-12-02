import Head from "next/head";
import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Head>
        {/* put all meta-tags here */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div id="top" className="layoutMain">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
