import { getSauveteur } from "@pages/api/get_sauveteur";
import { queryToString } from "@utils";
import { ISauveteur } from "@utils/types";
import { GetServerSideProps } from "next";

interface Props {
  sauveteur: ISauveteur;
}

export default function Sauveteur({ sauveteur }: Props) {
  console.log(sauveteur);
  return <div>Sauveteur</div>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const sauveteur_id = queryToString(context.query.id);
  if (!sauveteur_id) {
    return {
      notFound: true,
    };
  }
  const sauveteur = await getSauveteur(sauveteur_id);
  if (!sauveteur) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      sauveteur,
    },
  };
};
