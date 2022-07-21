import { NextFunction, Request, Response } from 'express';
import { validaObjeto, validaToken } from '../helpers/utils';

const postComprarMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  // Validando atributos Objeto de Requisição de compra
  const isValid = await validaObjeto(req.body);
  const message = isValid.error?.message;
  if (message) {
    return res.status(400).json({ message });
  }

  // Validando token
  const isTokenValid = await validaToken(token);
  if (!isTokenValid) return res.status(400).json({ message: 'token Inválido ' });

  return next();
};

const postVenderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  // Validando atributos Objeto de Requisição de venda
  const isValid = await validaObjeto(req.body);
  const message = isValid.error?.message;
  if (message) {
    return res.status(400).json({ message });
  }

  // Validando token
  const isTokenValid = await validaToken(token);
  if (!isTokenValid) return res.status(400).json({ message: 'token Inválido ' });

  return next();
};

export default { postComprarMiddleware, postVenderMiddleware };
