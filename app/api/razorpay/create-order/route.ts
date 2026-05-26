import { NextResponse } from "next/server";

type CreateOrderBody = {
  planName?: string;
  amount?: number;
};

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Razorpay keys are missing on the server.",
        },
        { status: 500 }
      );
    }

    const body: CreateOrderBody = await request.json();

    const planName = body.planName || "YumeMotion Plan";
    const amount = body.amount || 0;

    if (!amount || amount < 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount. Minimum amount should be ₹1.",
        },
        { status: 400 }
      );
    }

    const authToken = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `yumemotion_${Date.now()}`,
        notes: {
          planName,
          website: "YumeMotion",
          mode: "test",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.error?.description || "Failed to create Razorpay order.",
          error: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating Razorpay order.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}