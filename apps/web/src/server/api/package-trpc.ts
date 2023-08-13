import { prisma } from "../db";
import { ZodError } from "zod";
import superjson from "superjson";
import { TRPCError, initTRPC } from "@trpc/server";
import { verifyAccessToken } from "@/services/sign-hash.service";

interface PackageContext {
  accessToken: string | null;
  projectId: string | null;
}

export const createPackageTRPCContext = (opts: PackageContext) => {
  return {
    prisma,
    ...opts,
  };
};

const packageT = initTRPC.context<typeof createPackageTRPCContext>().create({
  transformer: superjson,
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

export const createPackageTRPCRouter = packageT.router;

const isClientAuthorized = packageT.middleware(async ({ ctx, next }) => {
  if (!ctx.accessToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const { prisma, accessToken } = ctx;

  const foundToken = await prisma.clientAccessTokens.findFirst({
    where: { token: accessToken },
    include: {
      clientAccessTokenSecret: {
        select: {
          accessTokenSecret: true,
        },
      },
      project: true,
    },
  });

  if (foundToken) {
    const {
      token,
      projectId,
      clientAccessTokenSecret: { accessTokenSecret },
      project,
    } = foundToken;
    if (verifyAccessToken(token, projectId, accessTokenSecret)) {
      console.debug(`User trying to access project with ID: ${projectId}`);
      return next({
        ctx: project,
      });
    }
  }

  throw new TRPCError({ code: "UNAUTHORIZED" });
});

export const authorizedClientProcedure =
  packageT.procedure.use(isClientAuthorized);

export const publicClientProcedure = packageT.procedure;
