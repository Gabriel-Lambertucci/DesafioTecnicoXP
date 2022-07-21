import { NextFunction, Request, Response } from 'express';
import { validaCliente } from '../helpers/utils';

const criarClienteMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const isValid = await validaCliente(req.body);
  const message = isValid.error?.message;
  if (message) {
    return res.status(400).json({ message });
  }
  return next();
};

export default { criarClienteMiddleware };
