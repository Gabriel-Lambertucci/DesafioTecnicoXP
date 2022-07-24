import bcrypt from 'bcrypt-nodejs';
import clientesModel from '../models/clientesModel';
import contaModel from '../models/contaModel';

// Função auxiliar para verificar se o cliente ja existe ou não
// Se existir verifica se a senha esta correta novamente
const verificaCliente = async (CodCliente: number, Senha?: string) => {
  const clientes = await clientesModel.getClientes();
  const existeCliente = clientes.find((item) => item.CodCliente === CodCliente);
  if (!existeCliente) return false;
  if (Senha) {
    const senhaCorreta = bcrypt.compareSync(Senha || '', existeCliente.Senha);
    if (!senhaCorreta) return false;
  }
  return true;
};

// Função auxiliar para verificar valor da requisição
const verificaValor = (Valor: number) => {
  if (Valor <= 0) return false;
  return true;
};

const postSaque = async (CodCliente: number, Valor: number, Senha?: string) => {
  const existeCliente = Senha !== undefined
    ? await verificaCliente(CodCliente, Senha) : await verificaCliente(CodCliente);
  if (!existeCliente) return 'Código do cliente não encontrado e ou senha incorreta';

  if (!verificaValor(Valor)) return 'Valor de Saque precisa ser maior que zero';

  const saldo = await contaModel.getSaldoByClient(CodCliente);

  if (saldo[0].Valor < Valor) return 'Saldo insuficiente!';

  const novoSaldo = saldo[0].Valor - Valor;

  await contaModel.updateConta(CodCliente, novoSaldo);

  return true;
};

const postDeposito = async (CodCliente: number, Valor: number, Senha?: string) => {
  const existeCliente = Senha !== undefined
    ? await verificaCliente(CodCliente, Senha) : await verificaCliente(CodCliente);
  if (!existeCliente) return 'Código do cliente não encontrado e ou senha incorreta';

  if (!verificaValor(Valor)) return 'Valor de Depósito precisa ser maior que zero';

  const saldo = await contaModel.getSaldoByClient(CodCliente);
  const novoSaldo = saldo[0].Valor + Valor;
  await contaModel.updateConta(CodCliente, novoSaldo);

  return true;
};

const getContaByClient = async (CodCliente: number, Senha?: string) => {
  const existeCliente = await verificaCliente(CodCliente, Senha);
  if (!existeCliente) return 'Código do cliente não encontrado e ou senha incorreta';

  const cliente = await contaModel.getContaByClient(CodCliente);
  return cliente;
};

export default { postSaque, postDeposito, getContaByClient };
