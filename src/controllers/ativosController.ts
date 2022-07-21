import { Request, Response } from 'express';
import ativosService from '../services/ativosService';

const getAtivos = async (req: Request, res: Response) => {
  const ativos = await ativosService.getAtivos();
  if (!ativos) return res.status(404).json({ message: 'Erro inesperado, tente novamente' });
  return res.status(200).json(ativos);
};

const getByClient = async (req: Request, res: Response) => {
  const response = await ativosService.getByClient(parseInt(req.params.CodCliente, 10));
  if (!response) return res.status(404).json({ message: 'Usuário já Cadastrado' });
  return res.status(200).json(response);
};

export default { getAtivos, getByClient };
