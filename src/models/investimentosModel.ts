import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IComprar } from '../interfaces';
import connection from './connection';

const postComprar = async (body: IComprar): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO DesafioTecnico.Investimentos(CodCliente, CodAtivo, QtdeAtivo ) VALUES (?, ?, ?)',
    [body.CodCliente, body.CodAtivo, body.QtdeAtivo],
  );
  return result;
};

const postVender = async (CodCliente: number, CodAtivo: number, QtdeAtual: number):
Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'UPDATE DesafioTecnico.Investimentos SET QtdeAtivo = ? WHERE CodCliente = ? AND CodAtivo = ?',
    [QtdeAtual, CodCliente, CodAtivo],
  );
  return result;
};

const getInvestimentos = async (): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute('SELECT * FROM DesafioTecnico.Investimentos');
  return result as RowDataPacket[];
};

export default { postComprar, postVender, getInvestimentos };
