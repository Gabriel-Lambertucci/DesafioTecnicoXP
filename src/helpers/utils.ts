import Joi from "joi";
import { IComprar } from "../interfaces";

const totalCorretora = 100;
const totalCarteira = 20;

const validaObjeto = (input: IComprar) => { // Validação de objeto completo para requisição post de compra
  const schema = Joi.object({
    CodCliente: Joi.number().integer().required(),
    CodAtivo: Joi.number().integer().required(),
    QtdeAtivo: Joi.number().required(),
  }).messages({
    'any.required': '{{#label}} is required',
  });
  return schema.validate(input, { abortEarly: false });
};

export { totalCorretora , totalCarteira,validaObjeto };