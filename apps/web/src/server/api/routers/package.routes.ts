import { z } from "zod";
import {
  authorizedClientProcedure,
  createPackageTRPCRouter,
  publicClientProcedure,
} from "../package-trpc";

export const packageRoutes = createPackageTRPCRouter({
  test: publicClientProcedure.query(() => {
    return { value: "OK" };
  }),
  writeErrorLog: authorizedClientProcedure
    .input(
      z.object({
        event: z.string().optional(),
        source: z.string().optional(),
        lineNo: z.number().optional(),
        colNo: z.number().optional(),
        error: z.object({
          message: z.string().optional(),
          stack: z.string().optional(),
        }),
      })
    )
    .mutation(
      async ({
        ctx: { prisma, cookie, host, location, origin, id },
        input: {
          error: { message, stack },
          colNo,
          lineNo,
          source,
        },
      }) => {
        return await prisma.errorLogs.create({
          data: {
            projectId: id,
            cookie,
            host,
            location,
            origin,
            colNo,
            lineNo,
            source,
            stack,
            message,
          },
        });
      }
    ),
});
