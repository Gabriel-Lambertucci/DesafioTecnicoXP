import { Request, Response } from 'express';
import clientesService from '../services/clientesService';

const criarCliente = async (req: Request, res: Response) => {
  const id = await clientesService.criarCliente(req.body);
  if (!id) return res.status(404).json({ message: 'Usuário já Cadastrado' });
  return res.status(200).json({ CodCliente: id, Nome: req.body.Nome });
};

const getClientes = async (__req: Request, res: Response) => {
  const clientes = await clientesService.getClientes();
  if (clientes.length === 0) return res.status(404).json({ message: 'Não há clientes cadastrados' });
  return res.status(200).json(clientes);
};

export default { criarCliente, getClientes };
