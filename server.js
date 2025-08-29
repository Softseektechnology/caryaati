const express = require('express');
const fetch = require('node-fetch'); // or use axios
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/verify-recaptcha', async (req, res) => {
  try {
    const { recaptchaValue } = req.body;

    if (!recaptchaValue) {
      return res.status(400).json({ success: false, error: 'Missing reCAPTCHA token' });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ success: false, error: 'reCAPTCHA secret not configured' });
    }

    const googleRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${secretKey}&response=${recaptchaValue}`,
    });

    const googleData = await googleRes.json();

    console.log('Google reCAPTCHA response:', googleData);

    if (googleData.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({
        success: false,
        errorCodes: googleData['error-codes']
      });
    }
  } catch (error) {
    console.error('reCAPTCHA verify error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
