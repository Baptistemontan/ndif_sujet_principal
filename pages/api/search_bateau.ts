import { queryToString } from "@utils";
import { postAPI } from "@utils/api";
import { IBoat } from "@utils/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { boatCollection, multiQuery } from "@utils/firebase";

// import dummySauvetage from "./dummy_sauvetage.json";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | IBoat[]
    | {
        error: string;
      }
  >,
) {
  const { query } = req.body;
  const parsed_query = queryToString(query);

  if (!parsed_query) {
    res.status(400).json({
      error: "missing query srch string",
    });
    return;
  }

  const boats = await multiQuery(
    boatCollection,
    where("nom", "==", parsed_query),
    where("type", "==", parsed_query),
  );

  res.status(200).json(boats);
}

export async function searchBoat(query: string) {
  const boat = await postAPI<IBoat[], { query: string }>("search_bateau", {
    query,
  });
  console.log(boat);
  if (boat == null) return null;
  if (typeof boat === "string") {
    console.error("search boat error:", boat);
    return null;
  }
  return boat;
}
