import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express';

const errorMiddleware = (
  err:ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err) return res.status(500).json({ message: err });
  return next();
};

export default errorMiddleware;
