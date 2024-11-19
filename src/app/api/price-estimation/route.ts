import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { smtpConfig } from "../_emailConfig";
import { IFileWithSize } from "../../shared/interfaces";
import { getFormattedDate } from "../../_utils/dates";

export async function POST(request: NextRequest) {
  const {
    email,
    imie,
    nazwisko,
    numerTelefonu,
    firma,
    nazwaFirmy,
    miasto,
    kodPocztowy,
    ulica,
    nip,
    technologie,
    opisProjektu,
    pliki,
    projektDeadline,
  } = await request.json();

  let transporter = nodemailer.createTransport(smtpConfig);

  const attachments =
    pliki?.map((file: IFileWithSize) => ({
      filename: file.name,
      content: Buffer.from(file.data, "base64"),
      contentType: file.type,
    })) || [];

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_SERVER_USER,
    to: process.env.EMAIL_SERVER_USER,
    subject: `Nowe zgłoszenie od: ${imie} ${nazwisko} (${email})`,
    text: `
      Imię: ${imie}
      Nazwisko: ${nazwisko}
      Email: ${email}
      Numer telefonu: ${numerTelefonu}
      Firma: ${firma ? "Tak" : "Nie"}
      Nazwa firmy: ${firma ? nazwaFirmy : "Brak"}
      Miasto: ${miasto}
      Kod pocztowy: ${kodPocztowy}
      Ulica: ${ulica}
      NIP: ${nip}
      Termin wykonania: ${projektDeadline && getFormattedDate(projektDeadline)}
      Technologie: ${
        technologie.length > 0 ? technologie.join(", ") : "Brak technologii"
      }
      Opis projektu: ${opisProjektu}
    `,
    html: `
      <h3>Nowe zgłoszenie</h3>
      <ul>
        <li><strong>Imię:</strong> ${imie}</li>
        <li><strong>Nazwisko:</strong> ${nazwisko}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Numer telefonu:</strong> ${numerTelefonu}</li>
        <li><strong>Firma:</strong> ${firma ? "Tak" : "Nie"}</li>
        ${firma ? `<li><strong>Nazwa firmy:</strong> ${nazwaFirmy}</li>` : ""}
        <li><strong>Miasto:</strong> ${miasto}</li>
        <li><strong>Kod pocztowy:</strong> ${kodPocztowy}</li>
        <li><strong>Ulica:</strong> ${ulica}</li>
        <li><strong>NIP:</strong> ${nip}</li>
        <li><strong>Termin wykonania:</strong> ${
          projektDeadline && getFormattedDate(projektDeadline)
        }</li>
        <li><strong>Technologie:</strong> ${
          !!technologie.length
            ? technologie.map((el: { nazwa: string }) => el.nazwa)
            : "Brak technologii"
        }</li>
        <li><strong>Opis projektu:</strong> ${opisProjektu}</li>
      </ul>
    `,
    attachments,
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
