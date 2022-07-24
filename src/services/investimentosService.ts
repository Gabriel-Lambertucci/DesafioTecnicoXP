import { IComprar, IVender } from '../interfaces';
import investimentosModel from '../models/investimentosModel';
import ativosModel from '../models/ativosModel';
import clientesModel from '../models/clientesModel';
import contaModel from '../models/contaModel';
import contaService from './contaService';

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

  const valorUnitario: number = ativo && ativo.ValorUnitario;

  // Verificação de saldo do cliente
  const saldo = await contaModel.getSaldoByClient(CodCliente);
  if (saldo[0].Valor < QtdeAtivo * valorUnitario) return 'Saldo insuficiente para compra';

  const QtdeCorretora = ativo && ativo.QtdeCorretora;

  // Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
  if (QtdeAtivo > QtdeCorretora) return 'CodAtivo incorreto ou Quantidade do Ativo indisponível na corretora';

  const QtdeAtual = QtdeCorretora - QtdeAtivo; // Atualizando quantidade do ativo na Corretora
  await ativosModel.updateAtivo(CodAtivo, QtdeAtual);

  // Atualizar a quantidade de saldo da carteira
  await contaService.postSaque(CodCliente, QtdeAtivo * valorUnitario);
  const { insertId } = await investimentosModel.postComprar(body);
  return insertId;
};

const postVender = async (body: IVender): Promise<boolean | number | string> => {
  const { CodCliente, QtdeAtivo, CodAtivo } = body;

  // Verificação se existe cadastro do cliente antes de realizar transações
  const existeCliente = await verificaCliente(CodCliente);
  if (!existeCliente) return 'Código do cliente não encontrado';

  const investimentos = await investimentosModel.getInvestimentos();

  const investimento = investimentos.find((item) => item.CodAtivo === CodAtivo && item.CodCliente === CodCliente && item); /* eslint-disable-line*/

  if (!investimento) return 'Ação não encontrada. Reveja os códigos passados.';

  const QtdeCarteira = investimento.QtdeAtivo;

  // Quantidade de ativo a ser vendida não pode ser maior que a quantidade disponível na carteira
  if (QtdeAtivo > QtdeCarteira) return 'Quantidade a ser vendida indisponível na carteira';

  // Atualizando quantidade do ativo na Carteira
  const QtdeAtual = QtdeCarteira - QtdeAtivo;
  const response = await investimentosModel.postVender(CodCliente, CodAtivo, QtdeAtual);

  // Atualizando quantidade de saldo da carteira
  const ativos = await ativosModel.getAtivos();
  const ativo = ativos.filter((item) => item.CodAtivo === CodAtivo).find((item) => item);
  if (!ativo) return false;

  const valorUnitario: number = ativo && ativo.ValorUnitario;
  await contaService.postDeposito(CodCliente, QtdeAtivo * valorUnitario);

  return response && true;
};

const getInvestimentos = async () => {
  const investimentos = await investimentosModel.getInvestimentos();
  return investimentos;
};

export default { postComprar, postVender, getInvestimentos };
