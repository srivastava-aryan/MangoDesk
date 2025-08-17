import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// POST /api/summary - Proxy OpenRouter API using server-side API key
app.post('/api/summary', async (req, res) => {
  const { messages, model } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenRouter API key not configured.' });
  }
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages, model }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary.' });
  }
});

// POST /api/send-email - Send summary via email
app.post('/api/send-email', async (req, res) => {
  const { recipients, subject, text } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients,
      subject,
      text,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
