import { Request, Response } from 'express';
import contaService from '../services/contaService';

const postSaque = async (req: Request, res: Response) => {
  const response = await contaService.postSaque(
    req.body.CodCliente,
    req.body.Valor,
    req.body.Senha,
  );
  if (typeof response === 'string') return res.status(400).json({ message: response });
  return res.status(200).json({ message: 'Saque realizado com sucesso', Saque: req.body });
};

const postDeposito = async (req: Request, res: Response) => {
  const response = await contaService.postDeposito(
    req.body.CodCliente,
    req.body.Valor,
    req.body.Senha,
  );
  if (typeof response === 'string') return res.status(404).json({ message: response });
  return res.status(200).json({ message: 'Depósito realizado com sucesso', Deposito: req.body });
};

const getContaByClient = async (req: Request, res: Response) => {
  const cliente = await contaService.getContaByClient(
    parseInt(req.params.CodCliente, 10),
    req.body.Senha,
  );
  if (typeof cliente === 'string') return res.status(404).json({ message: cliente });
  return res.status(200).json(...cliente);
};

export default { postSaque, postDeposito, getContaByClient };
