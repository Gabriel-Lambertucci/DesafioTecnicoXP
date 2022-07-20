import { Request, Response } from 'express';
import investimentosService from '../services/investimentosService';

const postComprar = async (req: Request, res: Response) => {
  const response = await investimentosService.postComprar(req.body);
  console.log('Controller', response);
  if(!response) return res.status(409).json({ message: 'Quantidade de Ativo indisponível na corretora'})
  return res.status(200).json({ message: 'Compra realizada!' });
};

export default { postComprar };
