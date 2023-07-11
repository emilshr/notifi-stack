import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { TRPCError, initTRPC } from "@trpc/server";
import { type Session } from "next-auth";
import { ZodError, z } from "zod";
import { prisma } from "./db";
import { getServerAuthSession } from "./auth";
import SuperJSON from "superjson";

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

  const session = await getServerAuthSession({
    req,
    res,
  });

  return createInnerTRPCContext({ session });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

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

export const createTRPCRouter = t.router;

// this is our RPC API

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const publicProcedure = t.procedure;

export const appRouter = t.router({
  userById: protectedProcedure.input(z.number()).query((req) => {
    const { input } = req;
    return userList.find((u) => parseInt(u.id) === input);
  }),
});

export type AppRouter = typeof appRouter;
