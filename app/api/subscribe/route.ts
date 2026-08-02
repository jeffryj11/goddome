import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.log(`[Newsletter Subscription] Email: ${email}, Name: ${name || 'Subscriber'}`);
      return NextResponse.json({
        success: true,
        message: 'Thank you for subscribing to GodDome devotionals!',
      });
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, email, name || 'Subscriber']],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to GodDome devotionals!',
    });
  } catch (error: any) {
    console.error('Subscription API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while saving your subscription.' },
      { status: 500 }
    );
  }
}
