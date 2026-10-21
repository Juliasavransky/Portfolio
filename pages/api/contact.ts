import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { isBot, validateContact } from '@/lib/contact';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// ponytail: per-instance memory, resets on cold start and isn't shared across
// serverless instances. Move to Vercel Firewall / Upstash if spam gets through.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Pretend success so bots don't learn about the trap.
  if (isBot(req.body)) return res.status(200).json({ message: 'ok' });

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '').split(',')[0].trim();
  if (rateLimited(ip)) return res.status(429).json({ message: 'Too many requests' });

  const input = validateContact(req.body);
  if (!input) return res.status(400).json({ message: 'Invalid input' });
  const { name, email, message } = input;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: 'savranskyj@gmail.com',
      replyTo: email,
      subject: `Web Witch: new message from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}
