import { Request, Response } from 'express';
import ativosService from '../services/ativosService';

const getAtivos = async (__req: Request, res: Response) => {
  const ativos = await ativosService.getAtivos();
  if (!ativos) return res.status(404).json({ message: 'Erro inesperado, tente novamente' });
  return res.status(200).json(ativos);
};

const getByAtivo = async (req: Request, res: Response) => {
  const ativo = await ativosService.getByAtivo(parseInt(req.params.CodAtivo, 10));
  if (!ativo || ativo.length === 0) return res.status(404).json({ message: 'Ativo não encontrado!' });
  return res.status(200).json(...ativo);
};

const getByClient = async (req: Request, res: Response) => {
  const response = await ativosService.getByClient(parseInt(req.params.CodCliente, 10));
  if (!response) return res.status(404).json({ message: 'Usuário já Cadastrado' });
  return res.status(200).json(response);
};

export default { getAtivos, getByClient, getByAtivo };
