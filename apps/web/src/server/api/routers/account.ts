import { activateSubscription } from "@/services/razorpay-payment.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { PlanType } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const accountRouter = createTRPCRouter({
  upgradeAccount: protectedProcedure.mutation(
    async ({
      ctx: {
        prisma,
        session: {
          user: { id, planType },
        },
      },
    }) => {
      if (planType === PlanType.HOBBY) {
        const { orderId } = await activateSubscription(id);
        // await prisma.orders.create({});
        return orderId;
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Active premium subscription found",
      });
    },
  ),
  // checkAccountStatus: protectedProcedure.query(
  //   async ({
  //     ctx: {
  //       prisma,
  //       session: { user },
  //     },
  //   }) => {},
  // ),
});
