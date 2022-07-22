import clientesModel from '../models/clientesModel';
import contaModel from '../models/contaModel';

// Função auxiliar para verificar se o cliente ja existe ou não
const verificaCliente = async (CodCliente: number) => {
  const clientes = await clientesModel.getClientes();
  const existeCliente = clientes.some((item) => item.CodCliente === CodCliente);
  if (!existeCliente) return false;
  return true;
};

// Função auxiliar para verificar valor da requisição
const verificaValor = (Valor: number) => {
  if (Valor <= 0) return false;
  return true;
};

const postSaque = async (CodCliente: number, Valor: number) => {
  const existeCliente = await verificaCliente(CodCliente);
  if (!existeCliente) return 'Código do cliente não encontrado';

  if (!verificaValor(Valor)) return 'Valor de Saque precisa ser maior que zero';

  const saldo = await contaModel.getSaldoByClient(CodCliente);

  if (saldo[0].Valor < Valor) return 'Saldo insuficiente!';

  const novoSaldo = saldo[0].Valor - Valor;
  await contaModel.updateConta(CodCliente, novoSaldo);

  return true;
};

const postDeposito = async (CodCliente: number, Valor: number) => {
  const existeCliente = await verificaCliente(CodCliente);
  if (!existeCliente) return 'Código do cliente não encontrado';

  if (!verificaValor(Valor)) return 'Valor de Depósito precisa ser maior que zero';

  const saldo = await contaModel.getSaldoByClient(CodCliente);
  const novoSaldo = saldo[0].Valor + Valor;
  await contaModel.updateConta(CodCliente, novoSaldo);

  return true;
};

const getContaByClient = async (CodCliente: number) => {
  const existeCliente = await verificaCliente(CodCliente);
  if (!existeCliente) return 'Código do cliente não encontrado';

  const cliente = await contaModel.getContaByClient(CodCliente);
  return cliente;
};

export default { postSaque, postDeposito, getContaByClient };
