import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

export function toValidHTTPSURI(uri: string) {
  if (uri.includes("ipfs://")) {
    return `https://ipfs.io/ipfs/${uri.split("/").pop()}`;
  }
  return uri;
}

export const deleteUndefined = (obj: Record<string, any> | undefined): void => {
  if (obj) {
    Object.keys(obj).forEach((key: string) => {
      if (obj[key] && typeof obj[key] === "object") {
        deleteUndefined(obj[key]);
      } else if (typeof obj[key] === "undefined") {
        delete obj[key]; // eslint-disable-line no-param-reassign
      }
    });
  }
};

export function getNFTModule() {
  const rpcUrl = "https://rpc-mumbai.maticvigil.com";
  const provider = ethers.getDefaultProvider(rpcUrl);
  const sdk = new ThirdwebSDK(provider);
  return sdk.getNFTModule("0x8fD7DDa5942Aabe3a37d617465107dAafcB3202a");
}
