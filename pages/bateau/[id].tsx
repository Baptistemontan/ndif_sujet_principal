import { getBateau } from "@pages/api/get_bateau";
import { queryToString } from "@utils";
import { IBateau } from "@utils/types";
import { GetServerSideProps } from "next";

interface Props {
  bateau: IBateau;
}

export default function bateau({ bateau }: Props) {
  console.log(bateau);
  return <div>bateau</div>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const bateau_id = queryToString(context.query.id);
  if (!bateau_id) {
    return {
      notFound: true,
    };
  }
  const bateau = await getBateau(bateau_id);
  if (!bateau) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      bateau,
    },
  };
};
