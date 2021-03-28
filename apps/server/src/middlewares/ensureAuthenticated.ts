import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '~/config';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const [, token] = req.headers.authorization.split(' ');
  if (!token) throw new Error('JWT token is missing');
  try {
    const decodedToken = verify(token, authConfig.jwt.secret) as TokenPayload;
    const { sub } = decodedToken;
    req.user.id = sub;
    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
