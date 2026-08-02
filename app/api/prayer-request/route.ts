import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, request: prayerDetails, isPrivate } = await request.json();

    if (!prayerDetails || prayerDetails.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please share a brief message or prayer request.' },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER || 'allofjeannasoul@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailAppPassword) {
      console.log(`[Prayer Request Logged] Name: ${name || 'Anonymous'}, Email: ${email || 'None'}, Private: ${isPrivate ? 'Yes' : 'No'}, Message: ${prayerDetails}`);
      return NextResponse.json({
        success: true,
        message: 'Your prayer request has been received with love. We are holding you in prayer.',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const mailOptions = {
      from: `GodDome Prayer Ministry <${gmailUser}>`,
      to: 'allofjeannasoul@gmail.com',
      replyTo: email || gmailUser,
      subject: `[GodDome Prayer Request] ${isPrivate ? '🔒 Confidential' : '🙏'} from ${name || 'a Visitor'}`,
      html: `
        <div style="font-family: Georgia, serif; padding: 24px; background-color: #FAF6F0; color: #2C221E; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid #D99B26;">
          <h2 style="color: #A83226; margin-top: 0;">Prayer Request Received</h2>
          <p><strong>From:</strong> ${name || 'Anonymous'}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Confidentiality:</strong> ${isPrivate ? '🔒 Private (Jeanna only)' : '🙏 Shared Prayer'}</p>
          <hr style="border: 0; border-top: 1px solid #2C221E20; margin: 20px 0;" />
          <p style="white-space: pre-wrap; font-size: 16px; line-height: 1.6;">${prayerDetails}</p>
          <hr style="border: 0; border-top: 1px solid #2C221E20; margin: 20px 0;" />
          <p style="font-size: 12px; color: #2C221E80;">Sent from GodDome Ministry (https://goddome.org)</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Your prayer request has been received with love. We are holding you in prayer.',
    });
  } catch (error: any) {
    console.error('Prayer request API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending your prayer request.' },
      { status: 500 }
    );
  }
}
