import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT, 
    },
    postgresUrl: process.env.DATABASE_URL,
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      ssl: process.env.POSTGRES_SSL == 'true',
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    stmp: {
      host: process.env.SMTP_HOST,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      port: process.env.SMTP_PORT,
      mail: process.env.SMTP_EMAIL,
    },
    baseUrl: process.env.BASE_URL,
  };
});
