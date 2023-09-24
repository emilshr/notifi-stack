import { razorPay } from "@/razorpay/razorpay-instance";
import { prisma } from "@/server/db";

export const activateSubscription = async (userId: string) => {
  try {
    const { id } = await razorPay.orders.create({
      amount: 10000,
      currency: "INR",
    });
    return { orderId: id };
  } catch (error) {
    console.error(`Error while activating subscription for user id: ${userId}`);
    throw error;
  }
};

export const checkPaymentStatus = async (accountId: string) => {
  try {
    // const {} = await prisma.orders.findFirstOrThrow({});
  } catch (error) {
    console.error(`Error while checking for payment status`);
    console.error(error);
  }
};
