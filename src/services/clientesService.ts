import { ICliente } from '../interfaces';
import clientesModel from '../models/clientesModel';

const criarCliente = async (body: ICliente) => {
  const { insertId } = await clientesModel.criarCliente(body);
  return insertId;
};

export default { criarCliente };
