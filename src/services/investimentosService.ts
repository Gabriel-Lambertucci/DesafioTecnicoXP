import { IComprar, IVender} from "../interfaces";
import investimentosModel from "../models/investimentosModel";
import { totalCorretora, totalCarteira } from "../helpers/utils"; // Constante simulando o total do ativo na corretora
import { ResultSetHeader } from "mysql2";

const postComprar = async (body: IComprar): Promise<boolean | number> => {
  const { QtdeAtivo } = body;
  console.log('QtdeAtivo', QtdeAtivo);
  if (QtdeAtivo > totalCorretora) return false; // Simulação de verificação: Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  const { insertId } = await investimentosModel.postVender(body);
  return insertId;
};

const postVender = async (body: IVender): Promise<boolean | number> => {
  const { QtdeAtivo} = body;
  if (QtdeAtivo> totalCarteira) return false; // Simulação de verificação: Quantidade de ativo a ser vendida não pode ser maior que a quantidade disponível na corretora
  const { insertId } = await investimentosModel.postVender(body);
  return insertId;
};

export default { postComprar, postVender };
