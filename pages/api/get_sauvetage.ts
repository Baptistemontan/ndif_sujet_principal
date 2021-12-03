import { queryToString } from "@utils";
import { getAPI, postAPI } from "@utils/api";
import { IBoat, ISauvetage } from "@utils/types";
import {
  boatConverter,
  sauvetageConverter,
  sauvetageRefConverter,
} from "@utils/converters";
import type { NextApiRequest, NextApiResponse } from "next";
import { boatCollection, sauvetageCollection } from "@utils/firebase";

// import dummySauvetage from "./dummy_sauvetage.json";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ISauvetage
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

  const sauvetageDocRef = doc(sauvetageCollection, id).withConverter(
    sauvetageConverter,
  );
  const sauvetageDoc = await getDoc(sauvetageDocRef);

  const sauvetageRef = sauvetageDoc.data();

  if (!sauvetageRef) {
    res.status(400).json({
      error: "sauvetage not found",
    });
    return;
  }

  const sauvetage = await sauvetageRefConverter(sauvetageRef);

  if (!sauvetage) {
    res.status(400).json({
      error: "sauvetage not found",
    });
    return;
  }

  res.status(200).json(sauvetage);
}

export async function getSauvetage(id: string) {
  const sauvetage = await postAPI<ISauvetage, { id: string }>("get_sauvetage", {
    id,
  });
  console.log(sauvetage);
  if (sauvetage == null) return null;
  if (typeof sauvetage === "string") {
    console.error("get sauvetage error:", sauvetage);
    return null;
  }
  return sauvetage;
}
