import { queryToString } from "@utils";
import { postAPI } from "@utils/api";
import { ISurvivor } from "@utils/types";
import { survivorConverter } from "@utils/converters";
import type { NextApiRequest, NextApiResponse } from "next";
import { survivorCollection } from "@utils/firebase";

// import dummySauvetage from "./dummy_sauvetage.json";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ISurvivor
    | {
        error: string;
      }
  >,
) {
  const { id: id_query } = req.body;
  const id = queryToString(id_query);

  if (!id) {
    res.status(400).json({
      error: "missing id",
    });
    return;
  }

  const survivorDocRef = doc(survivorCollection, id).withConverter(
    survivorConverter,
  );
  const survivorDoc = await getDoc(survivorDocRef);

  const survivor = survivorDoc.data();

  if (!survivor) {
    res.status(400).json({
      error: "survivor not found",
    });
    return;
  }

  res.status(200).json(survivor);
}

export async function getSurvivant(id: string) {
  const survivor = await postAPI<ISurvivor, { id: string }>("get_survivant", {
    id,
  });
  console.log(survivor);
  if (survivor == null) return null;
  if (typeof survivor === "string") {
    console.error("get survivant error:", survivor);
    return null;
  }
  return survivor;
}
