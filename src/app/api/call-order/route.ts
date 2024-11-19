import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { smtpConfig } from "../_emailConfig";
import { IFileWithSize } from "../../shared/interfaces";

export async function POST(request: NextRequest) {
  const { imie, numerTelefonu } = await request.json();

  let transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_SERVER_USER,
    to: process.env.EMAIL_SERVER_USER,
    subject: `Nowe prośba o telefon od: ${imie}`,
    text: `
      Imię: ${imie}
      Numer telefonu: ${numerTelefonu}
      
    `,
    html: `
      <h3>Nowe zgłoszenie</h3>
      <ul>
        <li><strong>Imię:</strong> ${imie}</li>
        <li><strong>Numer telefonu:</strong> ${numerTelefonu}</li>
      </ul>
    `,
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
