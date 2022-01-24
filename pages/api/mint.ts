import { ThirdwebSDK, uploadToIPFS } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // the RPC URL to the blockchain that the NFT contract is deployed on.
  // "rinkeby" = rinkeby testnet,
  // "https://rpc-mumbai.maticvigil.com" = mumbai testnet.
  const rpcUrl = "https://rpc-mumbai.maticvigil.com";

  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY || "",
    ethers.getDefaultProvider(rpcUrl)
  );

  const nft = new ThirdwebSDK(wallet).getNFTModule(
    process.env.CONTRACT_ADDRESS || ""
  );

  // @ts-ignore
  const buffer = fs.readFileSync(req.files.file[0].path);
  const fileType = await fileTypeFromBuffer(buffer);
  return new Promise<void>((resolve) => {
    uploadToIPFS(buffer, process.env.CONTRACT_ADDRESS)
      .then((ipfsUrl) => {
        nft
          .mintTo(req.body.address[0], {
            name: req.body.name[0],
            description: req.body.description[0],
            contentUri: ipfsUrl,
            properties: {
              mimeType: fileType?.mime,
              // TODO: add more properties
              // TODO: add album art
              // image: ipfsUrl,
            },
          })
          .then((metadata) => {
            res.status(200).json(metadata);
            resolve();
          })
          .catch((error) => {
            console.log(req.body);
            res.status(500).json(error);
            resolve();
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          message: "Error uploading to IPFS",
          error: err.message,
          // @ts-ignore
          req: req.files.file[0].path,
        });
        resolve();
      });
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
