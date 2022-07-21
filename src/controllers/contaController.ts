import { Request, Response } from 'express';
import contaService from '../services/contaService';

const postSaque = async (req: Request, res: Response) => {
  const id = await contaService.postSaque(req.body.CodCliente, req.body.Valor);
  if (!id) return res.status(404).json({ message: 'Codigo do cliente nao encontrado' });
  return res.status(200).json({ message: 'Saque realizado com sucesso!', Saque: req.body });
};

export default { postSaque };
