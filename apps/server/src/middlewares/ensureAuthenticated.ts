import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '~/configs';
import { AppError } from '~/errors';

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
  if (!token) throw new AppError('JWT token is missing', 401);
  try {
    const decodedToken = verify(token, authConfig.jwt.secret) as TokenPayload;
    req.user = { id: decodedToken.sub };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
