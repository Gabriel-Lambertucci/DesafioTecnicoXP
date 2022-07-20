import { Request, Response } from 'express';
import investimentosService from '../services/investimentosService';

const postComprar = async (req: Request, res: Response) => {
  const id = await investimentosService.postComprar(req.body);
  if(!id) return res.status(409).json({ message: 'Quantidade de Ativo indisponível na corretora'})
  return res.status(200).json({ message: 'Compra realizada com sucesso', Compra: req.body});
};

const postVender = async (req: Request, res: Response) => {
  const id = await investimentosService.postVender(req.body);
  if(!id) return res.status(409).json({ message: 'Quantidade a ser vendida indisponível na carteira'})
  return res.status(200).json({ message: 'Venda realizada com sucesso', Venda: req.body});
};

export default { postComprar, postVender };
