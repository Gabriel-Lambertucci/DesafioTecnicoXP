import { IComprar, IVender } from '../interfaces';
import investimentosModel from '../models/investimentosModel';
import ativosModel from '../models/ativosModel';
import clientesModel from '../models/clientesModel';

// Função auxiliar para verificar se o cliente ja existe ou não
const verificaCliente = async (CodCliente: number) => {
  const clientes = await clientesModel.getClientes();
  const existeCliente = clientes.some((item) => item.CodCliente === CodCliente);
  if (!existeCliente) return false;
  return true;
};

const postComprar = async (body: IComprar): Promise<boolean | number | string> => {
  const { CodCliente, QtdeAtivo, CodAtivo } = body;

  // Verificação se existe cadastro do cliente antes de realizar transações
  const existeCliente = await verificaCliente(CodCliente);
  if (!existeCliente) return 'Código do cliente não encontrado';

  const ativos = await ativosModel.getAtivos();
  const ativo = ativos.filter((item) => item.CodAtivo === CodAtivo).find((item) => item);
  if (!ativo) return false;
  const QtdeCorretora = ativo && ativo.QtdeCorretora;

  // Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  if (QtdeAtivo > QtdeCorretora) return 'CodAtivo incorreto ou Quantidade do Ativo indisponível na corretora';

  const QtdeAtual = QtdeCorretora - QtdeAtivo; // Atualizando quantidade do ativo na Corretora
  await ativosModel.updateAtivo(CodAtivo, QtdeAtual);

  const { insertId } = await investimentosModel.postComprar(body);
  return insertId;
};

const postVender = async (body: IVender): Promise<boolean | number | string> => {
  const { CodCliente, QtdeAtivo, CodAtivo } = body;

  // Verificação se existe cadastro do cliente antes de realizar transações
  const existeCliente = await verificaCliente(CodCliente);
  if (!existeCliente) return 'Código do cliente não encontrado';

  const investimentos = await investimentosModel.getInvestimentos();

  const investimento = investimentos.filter((item) => item.CodAtivo === CodAtivo).find((item) => item); /* eslint-disable-line*/

  if (!investimento) return false;
  const QtdeCarteira = investimento && investimento.QtdeAtivo;

  // Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  if (QtdeAtivo > QtdeCarteira) return 'Quantidade a ser vendida indisponível na carteira';

  const QtdeAtual = QtdeCarteira - QtdeAtivo; // Atualizando quantidade do ativo na Carteira
  const response = await investimentosModel.postVender(CodCliente, CodAtivo, QtdeAtual);
  return response && true;
};

export default { postComprar, postVender };
