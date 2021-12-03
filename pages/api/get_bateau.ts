import { queryToString } from "@utils";
import { postAPI } from "@utils/api";
import { IBoat, ISurvivor } from "@utils/types";
import { boatConverter } from "@utils/converters";
import type { NextApiRequest, NextApiResponse } from "next";
import { boatCollection } from "@utils/firebase";

// import dummySauvetage from "./dummy_sauvetage.json";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | IBoat
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

  const boatDocRef = doc(boatCollection, id).withConverter(boatConverter);
  const boatDoc = await getDoc(boatDocRef);

  const boat = boatDoc.data();

  if (!boat) {
    res.status(400).json({
      error: "boat not found",
    });
    return;
  }

  res.status(200).json(boat);
}

export async function getSurvivant(id: string) {
  const boat = await postAPI<IBoat, { id: string }>("get_bateau", {
    id,
  });
  console.log(boat);
  if (boat == null) return null;
  if (typeof boat === "string") {
    console.error("get bateau error:", boat);
    return null;
  }
  return boat;
}
