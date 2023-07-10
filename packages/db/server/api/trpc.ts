import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const { router, middleware, procedure: publicProcedure } = t;

export { router, middleware, publicProcedure };
