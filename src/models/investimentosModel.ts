import { IComprar, IVender } from "../interfaces";

const postComprar = async (__body: IComprar): Promise<boolean> => {
  // A função de comunicacão com o banco de dados entraria aqui:
  // Simulando uma possível conexão com mySql:
  // await connection.execute('INSERT INTO db.tabela (CodCliente, CodAtivo, QtdeAtivo ) VALUES (?, ?)',
  // [body.CodCliente, body.CodAtivo, body.QtdeAtivo])
  return true;
}

const postVender = async (__body: IVender): Promise<boolean> => {
  // A função de comunicacão com o banco de dados entraria aqui:
  // Simulando uma possível conexão com mySql:
  // await connection.execute('INSERT INTO db.tabela (idAtivo, QtdeAtivo,  ) VALUES (?, ?)',
  // [body.CodCliente, body.CodAtivo, body.QtdeAtivo])
  return true;
}

export default { postComprar, postVender };