import SearchBar from "@components/SearchBar";
import Style from "@styles/Search.module.scss";
import { queryToString } from "@utils";
import { IBoat, ISavior, ISurvivor } from "@utils/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { searchBoat } from "./api/search_bateau";
import { searchSurvivant } from "./api/search_survivant";

interface Props {
  searchStr: string;
  boats: IBoat[];
  survivors: ISurvivor[];
  // saviors: ISavior[];
}

export default function Search({
  searchStr,
  boats,
  survivors,
}: // saviors,
Props) {
  console.log(searchStr, boats, survivors);
  return (
    <div className={Style.wrapper}>
      <h1>Search</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const query_str = queryToString(context.query.q);
  if (!query_str) {
    return {
      notFound: true,
    };
  }
  // const survivor = await searchBoat(survivor_id);
  const results = await Promise.all([
    searchBoat(query_str),
    searchSurvivant(query_str),
  ]);

  if (results.includes(null)) {
    return {
      notFound: true,
    };
  }
  const [boats, survivors] = results;
  return {
    props: {
      survivors: survivors!,
      boats: boats!,
      searchStr: query_str,
    },
  };
};
