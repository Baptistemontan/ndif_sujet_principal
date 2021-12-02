import { queryToString } from "@utils";
import { getAPI, postAPI } from "@utils/api";
import { ISauvetage } from "@utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

import dummySauvetage from "./dummy_sauvetage.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISauvetage>,
) {
  const { id_query } = req.query;
  const id = queryToString(id_query);

  // do shit here

  // dummy response
  res.status(200).json(dummySauvetage);
}

export async function getSauvetage(id: number) {
  const sauvetage = await postAPI<ISauvetage, { id: number }>("get_sauvetage", {
    id,
  });
  if (sauvetage == null) return null;
  if (typeof sauvetage === "string") {
    console.error("get sauvetage error:", sauvetage);
    return null;
  }
  return sauvetage;
}
