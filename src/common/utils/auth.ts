import jwt from 'jsonwebtoken';

import { env } from './envConfig';

const secretKey = env.JWT_SECRET_KEY;
const tokenExpiration = env.JWT_EXPIRATION;

export interface PayloadInterface {
  name: string;
  email: string;
}

interface DecodedToken extends PayloadInterface {
  exp: number;
}

export function generateAuthToken(payload: PayloadInterface): string {
  return jwt.sign(payload, secretKey, { expiresIn: tokenExpiration });
}

export function readAuthToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error('Error reading auth token:', error);
    return null;
  }
}
