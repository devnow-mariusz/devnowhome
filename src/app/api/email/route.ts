import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { smtpConfig } from "../_emailConfig";

export async function POST(request: NextRequest) {
  const { email, imie, nazwisko, wiadomosc } = await request.json();

  let transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_SERVER_USER,
    to: process.env.EMAIL_SERVER_USER,
    subject: `Wiadomość od: ${imie} ${nazwisko} (${email})`,
    text: wiadomosc,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Message sent successfully");
        } else {
          console.log(err.message);
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        status: 200,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err,
        status: 500,
      },
      { status: 500 }
    );
  }
}
