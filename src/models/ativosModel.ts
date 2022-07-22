import { RowDataPacket } from 'mysql2';
import connection from './connection';

const getAtivos = async (): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute('SELECT * FROM Ativos');
  return result as RowDataPacket[];
};

const getByAtivo = async (CodAtivo: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    'SELECT CodAtivo, QtdeCorretora AS QtdeAtivo, ValorUnitario as Valor FROM Ativos WHERE CodAtivo = ?',
    [CodAtivo],
  );
  return result as RowDataPacket[];
};

const updateAtivo = async (CodAtivo: number, QtdeAtual: number) => {
  await connection.execute('UPDATE Ativos SET QtdeCorretora = ? WHERE CodAtivo = ?', [QtdeAtual, CodAtivo]);
};

const getByClient = async (CodCliente: number) => {
  const [result] = await connection.execute<RowDataPacket[]>(
    'SELECT CodCliente, CodAtivo, QtdeAtivo FROM Investimentos WHERE CodCliente = ?',
    [CodCliente],
  );
  const result2 = result.map(async (item) => {
    const [response] = await connection.execute<RowDataPacket[]>(
      'SELECT CodAtivo, ValorUnitario AS Valor FROM Ativos WHERE CodAtivo = ?',
      [item.CodAtivo],
    );
    return response[0];
  });
  const result3 = await Promise.all(result2);
  const returnArray = result.map((item) => ({
    ...item,
    Valor: result3.find((element) => element.CodAtivo === item.CodAtivo)?.Valor,
  }));

  return returnArray as RowDataPacket[];
};

export default {
  getAtivos, updateAtivo, getByClient, getByAtivo,
};
