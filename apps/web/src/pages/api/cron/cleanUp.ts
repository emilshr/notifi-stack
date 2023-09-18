import { prisma } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _request: NextApiRequest,
  _res: NextApiResponse,
) {
  try {
    await prisma.errorLogs.findFirst({ where: {} });
  } catch (error) {
    console.error(`Error while running the cron job`);
    console.error(error);
  }
}
