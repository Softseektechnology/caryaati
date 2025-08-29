import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB limit
    filter: ({ mimetype }) => {
      return mimetype && mimetype.includes('image');
    },
  });

  try {
    const [fields, files] = await form.parse(req);

    const {
      contactPersonName,
      companyName,
      email,
      countryCode,
      mobileNumber,
      address,
      website,
      totalCars,
      ownerName,
      ownerEmail,
      ownerCountryCode,
      ownerMobileNumber,
      emiratesIdNumber,
      tradeLicenseNumber,
    } = fields;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password', // Replace with your app-specific password
      },
    });

    const phone = `${countryCode} ${mobileNumber}`;
    const ownerPhone = `${ownerCountryCode} ${ownerMobileNumber}`;

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient-email@example.com', // Replace with recipient email
      subject: 'New Partner Registration',
      text: `
        Contact Person Name: ${contactPersonName}
        Company Name: ${companyName}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}
        Website: ${website || 'N/A'}
        Total Number of Cars: ${totalCars}
        Owner Name: ${ownerName}
        Owner Email: ${ownerEmail}
        Owner Phone: ${ownerPhone}
        Emirates ID Number: ${emiratesIdNumber || 'N/A'}
        Trade License Number: ${tradeLicenseNumber || 'N/A'}
      `,
      attachments: [],
    };

    const fileFields = ['emiratesIdFrontImage', 'emiratesIdBackImage', 'tradeLicenseImage'];
    for (const field of fileFields) {
      const file = files[field]?.[0];
      if (file) {
        mailOptions.attachments.push({
          filename: file.originalFilename,
          path: file.filepath,
        });
      }
    }

    await transporter.sendMail(mailOptions);

    for (const field of fileFields) {
      const file = files[field]?.[0];
      if (file && fs.existsSync(file.filepath)) {
        fs.unlinkSync(file.filepath);
      }
    }

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}