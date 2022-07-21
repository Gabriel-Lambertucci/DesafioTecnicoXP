import clientesModel from '../models/clientesModel';
import contaModel from '../models/contaModel';

const postSaque = async (CodCliente: number, Valor: number) => {
  const clientes = await clientesModel.getClientes();
  const existeCliente = clientes.some((item) => item.CodCliente === CodCliente);
  if (!existeCliente) return false;

  const saldo = await contaModel.getSaldoByClient(CodCliente);
  console.log(saldo);
  /*  if (saldo < Valor) */

  const response = await contaModel.postSaque(CodCliente, Valor);
  return response;
};

export default { postSaque };
