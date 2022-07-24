import { ICliente } from '../interfaces';
import clientesModel from '../models/clientesModel';
import contaModel from '../models/contaModel';

const postCliente = async (body: ICliente) => {
  const clientes = await clientesModel.getClientes();
  const existeCliente = clientes.some((item) => item.UserName === body.Nome);
  if (existeCliente) return false;

  const { insertId } = await clientesModel.postCliente(body);
  await contaModel.postConta(insertId);
  return insertId;
};

const getClientes = async () => {
  const clientes = await clientesModel.getClientes();
  return clientes;
};

export default { postCliente, getClientes };
