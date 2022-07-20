import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { IComprar, IVender } from "../interfaces";

const validaObjetoCompra = (input: IComprar) => { // Validação de objeto completo para requisição post de compra
  const schema = Joi.object({
    CodCliente: Joi.number().integer().required(),
    CodAtivo: Joi.number().integer().required(),
    QtdeAtivo: Joi.number().required(),
  }).messages({
    'any.required': '{{#label}} is required',
  });
  return schema.validate(input, { abortEarly: false });
};

const postComprarMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const isValid = await validaObjetoCompra(req.body);
  const message = isValid.error?.message;
  if (message) {
    return res.status(400).json({ message });
  }
  next();
}

const validaObjetoVenda = (input: IVender) => { // Validação de objeto completo para requisição post de venda
  const schema = Joi.object({
    idAtivo: Joi.number().integer().required(),
    QtdeVendida: Joi.number().required(),
    ContaVendedora: Joi.number().required(),
  }).messages({
    'any.required': '{{#label}} is required',
  });
  return schema.validate(input, { abortEarly: false });
};

const postVenderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const isValid = await validaObjetoVenda(req.body);
  const message = isValid.error?.message;
  if (message) {
    return res.status(400).json({ message });
  }
  next();
}


export default { postComprarMiddleware, postVenderMiddleware }