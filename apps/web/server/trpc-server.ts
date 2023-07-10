import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { initTRPC } from "@trpc/server";
import { Session } from "next-auth";
import { z } from "zod";
import { prisma } from "./db";
import { getServerAuthSession } from "./auth";

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (options: CreateContextOptions) => {
  return {
    session: options.session,
    prisma,
  };
};

export const createTRPCContext = async (options: CreateNextContextOptions) => {
  const { req, res } = options;

  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({ session });
};

const t = initTRPC.create();

// this is our data store, used to respond to incoming RPCs from the client

interface User {
  id: string;
  name: string;
}
const userList: User[] = [
  {
    id: "1",
    name: "KATT",
  },
  {
    id: "2",
    name: "Foo",
  },
];

// this is our RPC API
export const appRouter = t.router({
  userById: t.procedure.input(z.number()).query((req) => {
    const { input } = req;
    return userList.find((u) => parseInt(u.id) === input);
  }),
});

export type AppRouter = typeof appRouter;
