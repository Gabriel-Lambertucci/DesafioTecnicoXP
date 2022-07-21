import ativosModel from '../models/ativosModel';

const getAtivos = () => {
  const ativos = ativosModel.getAtivos();
  return ativos;
};

const getByClient = async (CodCliente: number) => {
  const response = await ativosModel.getByClient(CodCliente);
  return response;
};

export default { getAtivos, getByClient };
