import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  HOST: host(),
  PORT: port(),
  CORS_ORIGIN: str(),
  DB_NAME: str(),
  DB_HOST: str(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_PORT: num(),
  JWT_SECRET_KEY: str(),
  JWT_EXPIRATION: str(),
});
