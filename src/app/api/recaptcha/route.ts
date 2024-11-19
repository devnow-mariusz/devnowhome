import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { captchaToken: token } = await request.json();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey || "",
          response: token || "",
        }).toString(),
      }
    );

    const data = await response.json();
    if (data.success) {
      return NextResponse.json(
        {
          success: true,
          message: "reCAPTCHA verification successful",
          status: 200,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "reCAPTCHA verification failed",
          status: 400,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during reCAPTCHA verification:", error);
    return NextResponse.json(
      { success: false, message: "Server error", status: 500 },
      { status: 500 }
    );
  }
}
