import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Style from "@styles/Home.module.scss";
import { ISurvivor } from "@utils/types";
import { handleEnterKeyDown, queryToString } from "@utils";
import { searchSurvivant } from "./api/search_survivant";
import { searchBoat } from "./api/search_bateau";
import { useRouter } from "next/router";
import SearchBar from "@components/SearchBar";
import useTranslation from "next-translate/useTranslation";

export default function Home() {
  const router = useRouter();
  const onSearch = (value: string) => {
    router.push({
      pathname: "/search",
      query: {
        q: value,
      },
    });
  };
  const { t } = useTranslation();
  return (
    <div className={Style.container}>
      <Head>
        <title>Home</title>
      </Head>
      <SearchBar
        onSearch={onSearch}
        onIconKeyDown={(str, e) => handleEnterKeyDown(e, () => onSearch(str))}
        ariaLabel={t("home:search-bar-label")}
        placeholder={t("home:search-bar-placeholder")}
      />
    </div>
  );
}
