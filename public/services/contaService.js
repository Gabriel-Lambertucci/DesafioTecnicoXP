"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const clientesModel_1 = __importDefault(require("../models/clientesModel"));
const contaModel_1 = __importDefault(require("../models/contaModel"));
// Função auxiliar para verificar se o cliente ja existe ou não
// Se existir verifica se a senha esta correta novamente
const verificaCliente = (CodCliente, Senha) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield clientesModel_1.default.getClientes();
    const existeCliente = clientes.find((item) => item.CodCliente === CodCliente);
    if (!existeCliente)
        return false;
    if (Senha) {
        const senhaCorreta = bcrypt_nodejs_1.default.compareSync(Senha || '', existeCliente.Senha);
        if (!senhaCorreta)
            return false;
    }
    return true;
});
// Função auxiliar para verificar valor da requisição
const verificaValor = (Valor) => {
    if (Valor <= 0)
        return false;
    return true;
};
const postSaque = (CodCliente, Valor, Senha) => __awaiter(void 0, void 0, void 0, function* () {
    const existeCliente = Senha !== undefined
        ? yield verificaCliente(CodCliente, Senha) : yield verificaCliente(CodCliente);
    if (!existeCliente)
        return 'Código do cliente não encontrado e ou senha incorreta';
    if (!verificaValor(Valor))
        return 'Valor de Saque precisa ser maior que zero';
    const saldo = yield contaModel_1.default.getSaldoByClient(CodCliente);
    if (saldo[0].Valor < Valor)
        return 'Saldo insuficiente!';
    const novoSaldo = saldo[0].Valor - Valor;
    yield contaModel_1.default.updateConta(CodCliente, novoSaldo);
    return true;
});
const postDeposito = (CodCliente, Valor, Senha) => __awaiter(void 0, void 0, void 0, function* () {
    const existeCliente = Senha !== undefined
        ? yield verificaCliente(CodCliente, Senha) : yield verificaCliente(CodCliente);
    if (!existeCliente)
        return 'Código do cliente não encontrado e ou senha incorreta';
    if (!verificaValor(Valor))
        return 'Valor de Depósito precisa ser maior que zero';
    const saldo = yield contaModel_1.default.getSaldoByClient(CodCliente);
    const novoSaldo = saldo[0].Valor + Valor;
    yield contaModel_1.default.updateConta(CodCliente, novoSaldo);
    return true;
});
const getContaByClient = (CodCliente, Senha) => __awaiter(void 0, void 0, void 0, function* () {
    const existeCliente = yield verificaCliente(CodCliente, Senha);
    if (!existeCliente)
        return 'Código do cliente não encontrado e ou senha incorreta';
    const cliente = yield contaModel_1.default.getContaByClient(CodCliente);
    return cliente;
});
exports.default = { postSaque, postDeposito, getContaByClient };
