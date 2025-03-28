'use strict';
import { StatusCodes } from '@/common/utils';
import { _PORT_ADMIN, _PORT_CLIENT } from '@/common/venv';
import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * CORS middleware
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 */
export const corsMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [`http://localhost:${_PORT_ADMIN}`, `http://localhost:${_PORT_CLIENT}`];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, uid');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(StatusCodes.default.NO_CONTENT);
    return;
  }

  next();
};
