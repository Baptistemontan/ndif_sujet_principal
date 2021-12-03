import { queryToString } from "@utils";
import { postAPI } from "@utils/api";
import { ISurvivor } from "@utils/types";
import { survivorConverter } from "@utils/converters";
import type { NextApiRequest, NextApiResponse } from "next";
import { survivorCollection } from "@utils/firebase";

// import dummySauvetage from "./dummy_sauvetage.json";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ISurvivor[]
    | {
        error: string;
      }
  >,
) {
  const { name: name_query } = req.body;
  const name = queryToString(name_query);

  if (!name) {
    res.status(400).json({
      error: "missing query srch string",
    });
    return;
  }

  const q = query(survivorCollection, where("name", "==", name));

  const snapshot = await getDocs(q);

  const survivors = snapshot.docs.map((doc) => doc.data());

  res.status(200).json(survivors);
}

export async function searchSurvivant(name: string) {
  const survivor = await postAPI<ISurvivor[], { name: string }>(
    "search_survivant",
    {
      name,
    },
  );
  console.log(survivor);
  if (survivor == null) return null;
  if (typeof survivor === "string") {
    console.error("get survivant error:", survivor);
    return null;
  }
  return survivor;
}
