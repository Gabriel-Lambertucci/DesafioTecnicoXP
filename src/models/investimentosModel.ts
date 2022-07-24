import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IComprar } from '../interfaces';
import connection from './connection';

const getInvestimentos = async (): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute('SELECT * FROM Investimentos');
  return result as RowDataPacket[];
};

const postComprar = async (body: IComprar): Promise<ResultSetHeader> => {
  // Verificando se o cliente ja possui investimento nesse ativo
  const investimentos = await getInvestimentos();
  const investimento = investimentos.find((item) => item.CodCliente === body.CodCliente && item.CodAtivo === body.CodAtivo); /* eslint-disable-line*/

  // Se possuir, somente atualizamos a quatidade do ativo em sua carteira
  if (investimento) {
    const QtdeAtual = investimento.QtdeAtivo + body.QtdeAtivo;
    const [response] = await connection.execute<ResultSetHeader>(
      'UPDATE Investimentos SET QtdeAtivo = ? WHERE CodCliente = ? AND CodAtivo = ?',
      [QtdeAtual, body.CodCliente, body.CodAtivo],
    );
    return response;
  }

  // Se não, além de atualizarmos a quatidade do ativo em sua carteira,
  // inserimos uma nova linha na tabela investimentos
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Investimentos(CodCliente, CodAtivo, QtdeAtivo ) VALUES (?, ?, ?)',
    [body.CodCliente, body.CodAtivo, body.QtdeAtivo],
  );
  return result;
};

const postVender = async (CodCliente: number, CodAtivo: number, QtdeAtual: number):
Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'UPDATE Investimentos SET QtdeAtivo = ? WHERE CodCliente = ? AND CodAtivo = ?',
    [QtdeAtual, CodCliente, CodAtivo],
  );
  return result;
};

export default { postComprar, postVender, getInvestimentos };
