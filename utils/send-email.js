import dayjs from 'dayjs';
import { emailTemplates } from './email-template.js';
import transporter from '../config/nodemailer.js';
import { EMAIL } from '../config/env.js';

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error('Missing required parameters: to or type');

  const template = emailTemplates.find((t) => t.label === type);
  if (!template) throw new Error(`No email template found for type: ${type}`);

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: EMAIL,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send reminder email');
    }
    console.log('Email sent successfully:', info.response);
  });
};
