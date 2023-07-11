import { getServerSession } from "next-auth";
import { authOptions } from "../../server/auth";
import { appRouter } from "../../server/trpc-server";
import { prisma } from "../../server/db";

export default async function Post() {
  const user = await getServerSession(authOptions);
  const caller = appRouter.createCaller({ prisma, session: user });
  const result = await caller.userById(1);
  console.log({ user, result });
  return <>post</>;
}
