import { getSauvetage } from "@pages/api/get_sauvetage";
import { queryToString } from "@utils";
import { ISauvetage } from "@utils/types";
import { GetServerSideProps } from "next";

interface Props {
  sauvetage: ISauvetage;
}

export default function Sauvetage({ sauvetage }: Props) {
  console.log(sauvetage);
  return <div>Sauvetage</div>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const sauvetage_id = queryToString(context.query.id);
  if (!sauvetage_id) {
    return {
      notFound: true,
    };
  }
  const sauvetage = await getSauvetage(sauvetage_id);
  if (!sauvetage) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      sauvetage,
    },
  };
};
