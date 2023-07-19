import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getProjects: protectedProcedure.query(({ ctx: { prisma, session } }) => {
    const {
      user: { id },
    } = session;
    return prisma.project.findMany({ where: { userId: id } });
  }),
});
