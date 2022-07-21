import { RowDataPacket } from 'mysql2';
import connection from './connection';

const postSaque = async (CodCliente: number, Valor: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute<RowDataPacket[]>(
    'INSERT INTO DesafioTecnico.Conta (CodCliente, Saldo) VALUES (?, ?)',
    [CodCliente, Valor],
  );
  return result as RowDataPacket[];
};

const getSaldoByClient = async (CodCliente: number) => {
  const [result] = await connection.execute<RowDataPacket[]>(
    'SELECT Saldo as VALOR FROM DesafioTecnico.Conta WHERE CodCliente = ?',
    [CodCliente],
  );
  return result;
};

export default { postSaque, getSaldoByClient };
