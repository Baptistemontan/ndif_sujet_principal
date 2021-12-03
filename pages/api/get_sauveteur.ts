import { queryToString } from "@utils";
import { postAPI } from "@utils/api";
import { IBoat, ISavior, ISurvivor } from "@utils/types";
import { saviorConverter } from "@utils/converters";
import type { NextApiRequest, NextApiResponse } from "next";
import { saviorCollection } from "@utils/firebase";

// import dummySauvetage from "./dummy_sauvetage.json";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ISavior
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

  const saviorDocRef = doc(saviorCollection, id).withConverter(saviorConverter);
  const saviorDoc = await getDoc(saviorDocRef);

  const savior = saviorDoc.data();

  if (!savior) {
    res.status(400).json({
      error: "savior not found",
    });
    return;
  }

  res.status(200).json(savior);
}

export async function getSurvivant(id: string) {
  const savior = await postAPI<ISavior, { id: string }>("get_sauveteur", {
    id,
  });
  console.log(savior);
  if (savior == null) return null;
  if (typeof savior === "string") {
    console.error("get sauveteur error:", savior);
    return null;
  }
  return savior;
}
