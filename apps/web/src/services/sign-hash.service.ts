import { randomBytes } from "crypto";

export const generateProjectSecret = () => {
  return randomBytes(48).toString("hex");
};
