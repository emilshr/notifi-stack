import crypto from "crypto-js";
import { env } from "@/env.mjs";

export const encryptData = (projectPublicId: string) => {
  return crypto.AES.encrypt(projectPublicId, env.ENCRYPTION_SECRET).toString();
};

export const decryptData = (encryptedData: string) => {
  return crypto.AES.decrypt(encryptedData, env.ENCRYPTION_SECRET).toString(
    crypto.enc.Utf8
  );
};
