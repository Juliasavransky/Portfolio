const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const msg = {
    to: 'savranskyj@gmail.com',
    from: 'savranskyj@gmail.com',
    subject: `${req.body.subject}`,
    text: `${req.body.message}`,
    html: `
    <h2> Hi this is ${req.body.name}<br>
    My Mail is: ${req.body.email}<br> 
    I writing you about: ${req.body.subject}<br> 
    My massage to you is: <h2>${req.body.massage}</h2>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('email send', res);
    })
    .catch((err: any) => {
      console.log('Error', err);
    });
}
