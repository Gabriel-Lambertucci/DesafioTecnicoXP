import { ICliente } from '../interfaces';
import clientesModel from '../models/clientesModel';

const criarCliente = async (body: ICliente) => {
  const clientes = await clientesModel.getClientes();
  const existeCliente = clientes.some((item) => item.UserName === body.Nome);
  if (existeCliente) return false;

  const { insertId } = await clientesModel.criarCliente(body);
  return insertId;
};

export default { criarCliente };
