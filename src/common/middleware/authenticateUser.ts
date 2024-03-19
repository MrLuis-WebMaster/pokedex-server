import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

import { readAuthToken } from '../utils/auth';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided' });
  }

  try {
    const decoded = readAuthToken(token) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token or Token has expired' });
  }
};

export default authenticateUser;
