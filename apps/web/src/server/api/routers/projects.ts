import { z } from "zod";
import {
  createTRPCRouter,
  paginatedPrivateProcedure,
  protectedProcedure,
} from "../trpc";
import { encryptData } from "@/services/sign-hash.service";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
  /**
   * @description Endpoint to get all projects for the requesting user. You can pass the last project id as a cursor to get paginated outputs
   */
  getProjects: paginatedPrivateProcedure.query(
    async ({ ctx: { prisma, session }, input: { cursor } }) => {
      const {
        user: { id },
      } = session;
      const items = await prisma.project.findMany({
        where: { userId: id },
        take: 11,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { id: cursor } : undefined,
      });
      let nextCursor: typeof cursor = undefined;
      if (items.length > 10) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }
  ),
  /**
   * @description Endpoint to create a project. Every project will be associated with a user entity
   */
  createProject: protectedProcedure
    .input(z.object({ projectName: z.string(), description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { projectName, description } = input;
      const {
        prisma,
        session: {
          user: { id },
        },
      } = ctx;
      const createdProject = await prisma.project.create({
        data: {
          name: projectName,
          description,
          userId: id,
        },
      });
      const { id: projectId, projectPublicId } = createdProject;
      const hashedSecret = encryptData(projectPublicId);
      console.log({ hashedSecret });
      await prisma.projectApiKeys.create({
        data: { projectId, hashedSecret, name: "API Key" },
      });
      return createdProject;
    }),
  /**
   *
   */
  getProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { projectId } }) => {
      const foundProject = await prisma.project.findFirst({
        where: { id: projectId },
      });
      return foundProject;
    }),
  updateProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: { projectId, name, description } }) => {
        return await prisma.project.update({
          where: { id: projectId },
          data: { name, description },
        });
      }
    ),
  deleteProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { projectId } }) => {
      return await prisma.project.delete({
        where: { id: projectId },
        include: { ProjectApiKeys: true },
      });
    }),
  getSecretAndApiKeys: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { projectId } }) => {
      const foundData = await prisma.projectApiKeys.findMany({
        where: { projectId },
        include: { project: true },
      });
      if (foundData.length > 0) {
        if (foundData[0]) {
          const { project } = foundData[0];
          const apiKeys = foundData.map(
            ({ hashedSecret, id, name, createdAt }) => ({
              hashedSecret,
              id,
              name,
              createdAt,
            })
          );
          return {
            project,
            apiKeys,
          };
        }
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Unable to find additional secrets",
      });
    }),
  createNewSecret: protectedProcedure
    .input(z.object({ projectId: z.string(), name: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { projectId, name } }) => {
      const foundProject = await prisma.project.findFirst({
        where: { id: projectId },
      });

      if (!foundProject) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project not found",
        });
      }
      const { projectPublicId } = foundProject;
      return await prisma.projectApiKeys.create({
        data: { hashedSecret: encryptData(projectPublicId), name, projectId },
      });
    }),
});
