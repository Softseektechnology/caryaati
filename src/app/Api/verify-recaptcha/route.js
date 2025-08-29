// app/api/verify-recaptcha/route.js

export async function POST(req) {
  try {
    const body = await req.json();
    const token = body.recaptchaValue;
    
    const secret = process.env.RECAPTCHA_SECRET_KEY || '6LcuvYMrAAAAAIwFZtg5j57Lvve6bLkL-nqMjAg3';

        // DEBUG logs
    console.log('Token from frontend:', token);
    console.log('Secret from env:', secret);

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: "Missing token" }), { status: 400 });
    }

    if (!secret) {
      return new Response(JSON.stringify({ success: false, error: "Unauthenticated" }), { status: 500 });
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ success: false, errorCodes: data['error-codes'] }),
        { status: 400 }
      );
    }
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Internal Server Error" }), {
      status: 500,
    });
  }
}