import { randomBytes, createHmac } from "crypto";

export const generateProjectSecret = () => {
  return randomBytes(48).toString("hex");
};

export const createHash = (publicProjectId: string, projectSecret: string) => {
  return createHmac("sha256", projectSecret)
    .update(publicProjectId)
    .digest("base64");
};
