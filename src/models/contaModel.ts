import { RowDataPacket } from 'mysql2';
import connection from './connection';

const getSaldoByClient = async (CodCliente: number) => {
  const [result] = await connection.execute<RowDataPacket[]>(
    'SELECT Saldo as Valor FROM Conta WHERE CodCliente = ?',
    [CodCliente],
  );
  return result as RowDataPacket[];
};

const postConta = async (CodCliente: number) => {
  await connection.execute(
    'INSERT INTO Conta (CodCliente, Saldo) VALUES (?,?)',
    [CodCliente, 0],
  );
};

const updateConta = async (CodCliente: number, Saldo: number) => {
  await connection.execute(
    'UPDATE Conta SET Saldo = ? WHERE CodCliente = ?',
    [Saldo, CodCliente],
  );
};

const getContaByClient = async (CodCliente: number) => {
  const [result] = await connection.execute<RowDataPacket[]>(
    'SELECT CodCliente, Saldo FROM Conta WHERE CodCliente = ?',
    [CodCliente],
  );
  return result as RowDataPacket[];
};

export default {
  getSaldoByClient,
  postConta,
  updateConta,
  getContaByClient,
};
