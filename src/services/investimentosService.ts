import { IComprar, IVender} from "../interfaces";
import investimentosModel from "../models/investimentosModel";
import { totalCorretora, totalCarteira } from "../helpers/utils"; // Constante simulando o total do ativo na corretora

const postComprar = async (body: IComprar): Promise<boolean> => {
  const { QtdeAtivo } = body;
  console.log('QtdeAtivo', QtdeAtivo);
  if (QtdeAtivo > totalCorretora) return false; // Simulação de verificação: Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  await investimentosModel.postComprar(body);
  return true;
};

const postVender = async (body: IVender): Promise<boolean> => {
  const { QtdeVendida } = body;
  if (QtdeVendida > totalCarteira) return false;
  await investimentosModel.postVender(body);
  return true;
};

export default { postComprar, postVender };
