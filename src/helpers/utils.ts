import Joi from 'joi';
import { IComprar } from '../interfaces';

const totalCorretora = 100;
const totalCarteira = 20;

// Validação de objeto completo para requisição post de compra

const validaObjeto = (input: IComprar) => {
  const schema = Joi.object({
    CodCliente: Joi.number().integer().required(),
    CodAtivo: Joi.number().integer().required(),
    QtdeAtivo: Joi.number().required(),
  }).messages({
    'any.required': '{{#label}} is required',
  });
  return schema.validate(input, { abortEarly: false });
};

// Validação de objeto para Login de usuário

const validaCliente = (input: {Nome: string, Senha: string}) => {
  const schema = Joi.object({
    Nome: Joi.string().required(),
    Senha: Joi.string().required(),
  }).messages({
    'any.required': '{{#label}} is required',
  });
  return schema.validate(input, { abortEarly: false });
};

export {
  totalCorretora, totalCarteira, validaObjeto, validaCliente,
};
