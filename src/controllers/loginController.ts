import { Request, Response } from 'express';
import loginService from '../services/loginService';

const login = async (req: Request, res: Response) => {
  const sucesso = await loginService.login(req.body);
  if (!sucesso) return res.status(500).json({ message: 'Usuário e/ou senha incorretos' });

  return res.status(200).json({ token: sucesso, Usuario: req.body.Nome });
};

export default { login };
