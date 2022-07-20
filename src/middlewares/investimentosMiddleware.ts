import { NextFunction, Request, Response } from "express";
import { validaObjeto } from "../helpers/utils";

const postComprarMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const isValid = await validaObjeto(req.body);
  const message = isValid.error?.message;
  if (message) {
    return res.status(400).json({ message });
  }
  next();
}

const postVenderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const isValid = await validaObjeto(req.body);
  const message = isValid.error?.message;
  if (message) {
    return res.status(400).json({ message });
  }
  next();
}


export default { postComprarMiddleware, postVenderMiddleware }