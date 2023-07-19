import { observable } from "@trpc/server/observable";
import {
  createTRPCRouter,
  protectedProcedure,
  protectedSubscription,
} from "../api/trpc";
import { Project } from "@prisma/client";
import { eventEmitter } from "./socket";
import { z } from "zod";

export const socketRouter = createTRPCRouter({
  onAdd: protectedSubscription(() => {
    return observable<Project>((emit) => {
      const onAdd = (data: Project) => {
        emit.next(data);
      };

      eventEmitter.on("add", onAdd);

      return () => {
        eventEmitter.off("add", onAdd);
      };
    });
  }),
  add: protectedProcedure
    .input(
      z.object({
        projectName: z.string(),
      })
    )
    .mutation(async (options) => {
      eventEmitter.emit("add", options.input);
      return options.input;
    }),
});
