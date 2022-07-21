import { IComprar, IVender } from '../interfaces';
import investimentosModel from '../models/investimentosModel';
import ativosModel from '../models/ativosModel';

const postComprar = async (body: IComprar): Promise<boolean | number> => {
  const { QtdeAtivo, CodAtivo } = body;

  // Simulação de verificação:
  // Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  const ativos = await ativosModel.getAtivos();
  const ativo = ativos.filter((item) => item.CodAtivo === CodAtivo).find((item) => item);
  if (!ativo) return false;
  const QtdeCorretora = ativo && ativo.QtdeCorretora;
  if (QtdeAtivo > QtdeCorretora) return false;

  const QtdeAtual = QtdeCorretora - QtdeAtivo; // Atualizando quantidade do ativo na Corretora
  await ativosModel.updateAtivo(CodAtivo, QtdeAtual);

  const { insertId } = await investimentosModel.postComprar(body);
  return insertId;
};

const postVender = async (body: IVender): Promise<boolean | number> => {
  const { CodCliente, QtdeAtivo, CodAtivo } = body;

  // Simulação de verificação:
  // Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  const investimentos = await investimentosModel.getInvestimentos();

  const investimento = investimentos.filter((item) => item.CodAtivo === CodAtivo).find((item) => item); /* eslint-disable-line*/

  if (!investimento) return false;
  const QtdeCarteira = investimento && investimento.QtdeAtivo;

  if (QtdeAtivo > QtdeCarteira) return false;

  const QtdeAtual = QtdeCarteira - QtdeAtivo; // Atualizando quantidade do ativo na Carteira
  const response = await investimentosModel.postVender(CodCliente, CodAtivo, QtdeAtual);
  return response && true;
};

export default { postComprar, postVender };
