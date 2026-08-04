import { sendQuoteEmail } from '../services/emailService.js';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 30;
const rateStore = new Map();

const getIp = (req) => {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return xff.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
};
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '');
const isPhone = (s) => {
  const digits = String(s || '').replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 20;
};
const within = (s, max) => typeof s === 'string' && s.length <= max;

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
};

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const apiKey = process.env.API_KEY;
  const reqKey = req.headers['x-api-key'];
  if (!apiKey || reqKey !== apiKey) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const ip = getIp(req);
  const now = Date.now();
  const arr = (rateStore.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (arr.length >= RATE_LIMIT_MAX) {
    const reset = Math.min(...arr) + RATE_LIMIT_WINDOW_MS;
    const remaining = Math.max(reset - now, 0);
    res.setHeader('Retry-After', String(Math.ceil(remaining / 1000)));
    res.setHeader('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
    res.setHeader('X-RateLimit-Remaining', '0');
    return res.status(429).json({ success: false, error: 'Rate limit exceeded' });
  }
  arr.push(now);
  rateStore.set(ip, arr);

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { name, email, phone } = body;

    const errors = [];
    if (name && !within(name, 100)) errors.push('Invalid name');
    if (email && !isEmail(email)) errors.push('Invalid email');
    if (phone && !isPhone(phone)) errors.push('Invalid phone');
    if (!email && !phone) errors.push('Either email or phone is required');
    if (body.address && !within(body.address, 200)) errors.push('Invalid address');
    if (body.vehicleType && !within(body.vehicleType, 50)) errors.push('Invalid vehicleType');
    if (body.package && !within(body.package, 50)) errors.push('Invalid package');
    if (body.message && !within(body.message, 2000)) errors.push('Invalid message');
    if (body.date && !within(body.date, 20)) errors.push('Invalid date');
    if (body.time && !within(body.time, 10)) errors.push('Invalid time');

    if (errors.length) {
      res.setHeader('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
      res.setHeader('X-RateLimit-Remaining', String(Math.max(RATE_LIMIT_MAX - arr.length, 0)));
      return res.status(400).json({ success: false, error: 'Validation failed', details: errors });
    }

    await sendQuoteEmail({
      name: body.name,
      phone: body.phone || 'Not provided',
      email: body.email,
      vehicleType: body.vehicleType || 'Not specified',
      package: body.package || 'Not specified',
      date: body.date || 'Not specified',
      time: body.time || 'Not specified',
      message: body.message || 'No additional message',
      address: body.address || 'Not provided'
    });

    res.setHeader('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
    res.setHeader('X-RateLimit-Remaining', String(Math.max(RATE_LIMIT_MAX - arr.length, 0)));
    return res.status(200).json({
      success: true,
      message: 'Quote request received and email sent successfully'
    });
  } catch (error) {
    console.error('Error processing quote request:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process quote request',
      details: error.message
    });
  }
}
