import { z } from "zod";
import {
  createPackageTRPCRouter,
  publicClientProcedure,
} from "../package-trpc";
import { signJwtToken } from "@/services/sign-hash.service";
import { TRPCError } from "@trpc/server";

export const packageRoutes = createPackageTRPCRouter({
  getAccessToken: publicClientProcedure
    .input(z.object({ projectApiKey: z.string(), projectId: z.string() }))
    .mutation(async ({ input: { projectApiKey }, ctx: { prisma } }) => {
      const foundProjectKey = await prisma.projectApiKeys.findFirst({
        where: { hashedSecret: projectApiKey },
      });
      if (foundProjectKey) {
        const { projectId } = foundProjectKey;
        const foundAccessTokenSecret =
          await prisma.clientAccessTokenSecrets.findFirst({
            where: { projectId },
            select: { accessTokenSecret: true, id: true },
          });
        if (foundAccessTokenSecret) {
          const { accessTokenSecret, id } = foundAccessTokenSecret;
          const createdToken = await prisma.clientAccessTokens.create({
            data: {
              token: signJwtToken(projectId, accessTokenSecret),
              clientAccessTokenSecretId: id,
              projectId,
            },
          });
          return { accessToken: createdToken.token };
        }
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Project not found",
      });
    }),
  test: publicClientProcedure.query(() => {
    return { value: "OK" };
  }),
});
