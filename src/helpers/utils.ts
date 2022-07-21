import Joi from 'joi';
import { JwtPayload, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IComprar } from '../interfaces';

dotenv.config();

const totalCorretora = 100;
const totalCarteira = 20;

// Validação de objeto completo para requisição post de compra e venda

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

const validaToken = async (token: string | undefined): Promise<string | JwtPayload | boolean> => {
  if (!token) {
    return false;
  }

  try {
    const validate = verify(token, process.env.JWT_SECRET || 'senhasecreta');
    return validate;
  } catch (error) {
    throw new Error('token inválido');
  }
};

export {
  totalCorretora, totalCarteira, validaObjeto, validaCliente, validaToken,
};
