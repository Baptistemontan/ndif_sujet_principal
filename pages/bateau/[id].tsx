import { getBateau } from "@pages/api/get_bateau";
import { queryToString } from "@utils";
import { IBoat } from "@utils/types";
import { GetServerSideProps } from "next";

interface Props {
  boat: IBoat;
}

export default function bateau({ boat }: Props) {
  console.log(boat);
  return <div>bateau</div>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const boat_id = queryToString(context.query.id);
  if (!boat_id) {
    return {
      notFound: true,
    };
  }
  const boat = await getBateau(boat_id);
  if (!boat) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      boat,
    },
  };
};
