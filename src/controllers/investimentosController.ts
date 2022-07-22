import { Request, Response } from 'express';
import investimentosService from '../services/investimentosService';

const postComprar = async (req: Request, res: Response) => {
  const id = await investimentosService.postComprar(req.body);
  if (typeof id === 'string') return res.status(409).json({ message: id });
  return res.status(200).json({ message: 'Compra realizada com sucesso!', Compra: req.body });
};

const postVender = async (req: Request, res: Response) => {
  const id = await investimentosService.postVender(req.body);
  if (typeof id === 'string') return res.status(409).json({ message: id });
  return res.status(200).json({ message: 'Venda realizada com sucesso!', Venda: req.body });
};

export default { postComprar, postVender };
