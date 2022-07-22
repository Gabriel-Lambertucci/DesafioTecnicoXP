import { ResultSetHeader, RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt-nodejs';
import { ICliente } from '../interfaces';
import connection from './connection';

const getClientes = async (): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute('SELECT * FROM Clientes');
  return result as RowDataPacket[];
};

const criarCliente = async (body: ICliente) => {
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(body.Senha, salt);
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Clientes (UserName, Senha) VALUES (?, ?)',
    [body.Nome, hash],
  );
  return result;
};

export default { criarCliente, getClientes };
