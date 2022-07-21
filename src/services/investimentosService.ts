import { IComprar, IVender } from '../interfaces';
import investimentosModel from '../models/investimentosModel';
import { totalCorretora, totalCarteira } from '../helpers/utils'; // Constante simulando o total do ativo na corretora

const postComprar = async (body: IComprar): Promise<boolean | number> => {
  const { QtdeAtivo } = body;
  // Simulação de verificação:
  // Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  if (QtdeAtivo > totalCorretora) return false;
  const { insertId } = await investimentosModel.postVender(body);
  return insertId;
};

const postVender = async (body: IVender): Promise<boolean | number> => {
  const { QtdeAtivo } = body;
  // Simulação de verificação:
  // Quantidade de ativo a ser vendida não pode ser maior que a quantidade disponível na corretora
  const { insertId } = await investimentosModel.postVender(body);
  if (QtdeAtivo > totalCarteira) return false;
  return insertId;
};

export default { postComprar, postVender };
