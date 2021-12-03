import { getSurvivant } from "@pages/api/get_survivant";
import { queryToString } from "@utils";
import { ISauvetage } from "@utils/types";
import { GetServerSideProps } from "next";

interface Props {
  sauvetage: ISurvivant;
}

export default function Survivant({ survivant }: Props) {
  console.log(survivant);
  return <div>Survivant</div>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const survivant_id = queryToString(context.query.id);
  if (!survivant_id) {
    return {
      notFound: true,
    };
  }
  const survivant = await getSurvivant(survivant_id);
  if (!survivant) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      survivant,
    },
  };
};
