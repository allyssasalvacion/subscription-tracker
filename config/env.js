import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
  PORT,
  NODE_ENV,
  SERVER_URL,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRATION,
  ARCJET_ENV,
  ARCJET_KEY,
  QSTASH_URL,
  QSTASH_TOKEN,
  EMAIL,
  EMAIL_PASSWORD,
} = process.env;
