import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';
import connection from '../models/connection';
import { ICliente } from '../interfaces';

dotenv.config();

const login = async (body: ICliente) => {
  let payload = {};

  const { Nome, Senha } = body;

  const [user] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM Clientes WHERE UserName = ?',
    [Nome],
  );

  if (!user || user.length === 0) return false;

  const senhaCorreta = bcrypt.compareSync(Senha, user[0].Senha);

  if (!senhaCorreta) return false;

  payload = { UserName: user[0].username, admin: true };

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'senhasecreta');
  return token;
};

export default { login };
