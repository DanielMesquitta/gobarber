import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors';

export default function globalExceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
}
