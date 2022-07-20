import { IComprarOuVender } from "../interfaces";
import investimentosModel from "../models/investimentosModel";
import totalCorretora from "../helpers/utils";

const postComprar = async (body: IComprarOuVender): Promise<boolean> => {
  const { QtdeAtivo } = body;
  console.log('QtdeAtivo', QtdeAtivo);
  if (QtdeAtivo > totalCorretora) return false; // Simulação de verificação: Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  await investimentosModel.postComprar(body);
  return true;
};

export default { postComprar };
