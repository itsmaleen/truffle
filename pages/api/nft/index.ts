import { NextApiRequest, NextApiResponse } from "next";
import { getNFTModule } from "../../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const module = getNFTModule();
  const nfts = await module.getAll();
  res.status(200).json(nfts);
}
