import { NextApiRequest, NextApiResponse } from "next";
import { getNFTModule } from "../../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const module = getNFTModule();
  const nft = await module.get(`${id}`);
  res.status(200).json(nft);
}
