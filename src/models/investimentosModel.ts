import { IComprarOuVender } from "../interfaces";

const postComprar = async (__body: IComprarOuVender): Promise<boolean> => {
  // A função de comunicacão com o banco de dados entraria aqui:
  // Simulando Função:
  // await connection.execute('INSERT INTO db.tabela (CodCliente, CodAtivo, QtdeAtivo ) VALUES (?, ?)',
  // [body.CodCliente, body.CodAtivo, body.QtdeAtivo])
  return true;
}

export default { postComprar };