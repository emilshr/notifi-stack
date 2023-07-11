import { Button, Header } from "ui";
import { appRouter } from "../server/trpc-server";
import { authOptions } from "../server/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../server/db";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const caller = appRouter.createCaller({ prisma, session });
  const result = await caller.userById(1);
  return (
    <>
      <Header text="Web" />
      <Button />
    </>
  );
}
