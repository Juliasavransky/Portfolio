// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   message: string;
// };
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>,
// ) {
//   const msg = {
//     to: "savranskyj@gmail.com",
//     from: `${req.body.email}`,
//     subject: `${req.body.subject}`,
//     text: `${req.body.message}`,
//     html: `
//     <h2> Hi this is ${req.body.name}<br>
//     My Mail is: ${req.body.email}<br>
//     I writing you about: ${req.body.subject}<br>
//     My massage to you is: <h2>${req.body.massage}</h2>`,
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("email send", res);
//     })
//     .catch((err: any) => {
//       console.log("Error", err);
//     });
// }
import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const msg = {
    to: 'savranskyj@gmail.com',
    from: 'savranskyj@gmail.com', // כתובת מאומתת ב-SendGrid
    replyTo: req.body.email, // כך שהנמען יוכל להשיב לשולח המקורי
    subject: req.body.subject,
    text: req.body.message,
    html: `
    <h2>Hi, this is ${req.body.name}</h2>
    <p><strong>My Email:</strong> ${req.body.email}</p>
    <p><strong>Subject:</strong> ${req.body.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${req.body.message}</p>
  `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}
