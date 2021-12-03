import Boat from "@components/Boat";
import SearchBar from "@components/SearchBar";
import Style from "@styles/Search.module.scss";
import { queryToString } from "@utils";
import { IBoat, ISavior, ISurvivor } from "@utils/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { searchBoat } from "./api/search_bateau";
import { searchSurvivant } from "./api/search_survivant";
import Survivor from "@components/Survivor";
import { cp } from "fs/promises";
import useTranslation from "next-translate/useTranslation";

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
  const { t } = useTranslation();
  return (
    <div className={Style.wrapper}>
      <h2>{t("boat:boat")}</h2>
      <ul>
        {boats.map((boat) => (
          <li key={boat.id}>
            <Boat boat={boat} />
          </li>
        ))}
      </ul>
      <h2>{t("survivor:survivor")}</h2>
      <ul>
        {survivors.map((survivor) => (
          <li key={survivor.id}>
            <Survivor survivor={survivor} />
          </li>
        ))}
      </ul>
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
