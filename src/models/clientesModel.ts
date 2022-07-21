import { ResultSetHeader } from 'mysql2';
import { ICliente } from '../interfaces';
import connection from './connection';

const criarCliente = async (body: ICliente) => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO DesafioTecnico.Clientes (UserName) VALUE (?)',
    [body.Nome],
  );
  return result;
};

export default { criarCliente };
