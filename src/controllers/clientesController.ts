import { Request, Response } from 'express';
import clientesService from '../services/clientesService';

const criarCliente = async (req: Request, res: Response) => {
  const id = await clientesService.criarCliente(req.body);
  if (!id) return res.status(404).json({ message: 'Erro' });
  return res.status(200).json({ id, Nome: req.body.Nome });
};

export default { criarCliente };
