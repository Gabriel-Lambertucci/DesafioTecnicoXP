import { NextFunction, Request, Response } from "express";
import totalCorretora from "../helpers/utils";
import Joi from "joi";
import { IComprarOuVender } from "../interfaces";

const validatePostObject = (input: IComprarOuVender) => { // Validação de objeto completo para requisição post de compra ou venda
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
  const isValid = await validatePostObject(req.body);
  console.log(isValid.error?.message);
  const message = isValid.error?.message;
  if (message) {
    return res.status(400).json({ message });
  }
  next();
}

export default { postComprarMiddleware }