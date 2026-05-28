import crypto from "crypto";
import { NextResponse } from "next/server";

type VerifyPaymentBody = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  planName?: string;
};

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Razorpay key secret is missing on the server.",
        },
        { status: 500 }
      );
    }

    const body: VerifyPaymentBody = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planName,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Razorpay payment verification details.",
        },
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed. Invalid signature.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Payment verified successfully for ${planName || "YumeMotion plan"}.`,
      payment: {
        razorpay_order_id,
        razorpay_payment_id,
        planName: planName || "YumeMotion Plan",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while verifying Razorpay payment.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}