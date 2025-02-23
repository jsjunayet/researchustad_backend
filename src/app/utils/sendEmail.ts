import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string, subject:string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'junayetshiblu0@gmail.com',
      pass: 'noyj xebx ehmu daqz',
    },
  });

  await transporter.sendMail({
    from: 'mezbaul@programming-hero.com', // sender address
    to, // list of receivers
    subject: `${subject}`, // Subject line
    text: '', // plain text body
    html, // html body
  });
};
