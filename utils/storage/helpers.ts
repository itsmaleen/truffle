import { getFilesFromPath, File } from "web3.storage";
import crypto from "crypto";

const algorithm = "aes-256-ctr";

async function getFiles(path: string) {
  const files = await getFilesFromPath(path);
  // TODO: remove this before production
  console.log(`read ${files.length} file(s) from ${path}`);
  return files;
}

async function encrypt(file: File, secret: string) {
  const arrBuf = await new Response(file).arrayBuffer();
  const buffer = Buffer.from(arrBuf);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secret, iv);
  const encrypted = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

  return encrypted;
}

async function decrypt(encrypted: Buffer, secret: string) {
  const iv = encrypted.slice(0, 16);
  encrypted = encrypted.slice(16);
  const decipher = crypto.createDecipheriv(algorithm, secret, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted;
}

export { getFiles, encrypt, decrypt };
