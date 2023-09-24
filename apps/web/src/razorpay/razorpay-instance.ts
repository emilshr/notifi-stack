import { env } from "@/env.mjs";
import Razorpay from "razorpay";

export const razorPay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});
