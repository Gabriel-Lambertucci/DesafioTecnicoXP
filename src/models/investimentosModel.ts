import { ResultSetHeader } from 'mysql2';
import { IComprar, IVender } from '../interfaces';
import connection from './connection';

const postComprar = async (body: IComprar): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO DesafioTecnico.InvestimentosComprar(CodCliente, CodAtivo, QtdeAtivo ) VALUES (?, ?, ?)',
    [body.CodCliente, body.CodAtivo, body.QtdeAtivo],
  );
  return result;
};

const postVender = async (body: IVender): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO DesafioTecnico.InvestimentosVender(CodCliente, CodAtivo, QtdeAtivo ) VALUES (?, ?, ?)',
    [body.CodCliente, body.CodAtivo, body.QtdeAtivo],
  );
  return result;
};

export default { postComprar, postVender };
