import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Style from "@styles/Home.module.scss";

export default function Home() {
  return (
    <div className={Style.container} onClick={() => console.log("test")}>
      <Head>
        <title>Home</title>
      </Head>
      <div>Home</div>
    </div>
  );
}
