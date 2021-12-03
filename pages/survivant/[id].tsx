import { getSurvivant } from "@pages/api/get_survivant";
import { queryToString } from "@utils";
import { ISauvetage, ISurvivor } from "@utils/types";
import { GetServerSideProps } from "next";

interface Props {
  survivor: ISurvivor;
}

export default function Survivant({ survivor }: Props) {
  console.log(survivor);
  return <div>Survivant</div>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const survivor_id = queryToString(context.query.id);
  if (!survivor_id) {
    return {
      notFound: true,
    };
  }
  const survivor = await getSurvivant(survivor_id);
  if (!survivor) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      survivor,
    },
  };
};
