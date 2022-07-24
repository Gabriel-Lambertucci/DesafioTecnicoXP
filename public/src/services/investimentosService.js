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
const investimentosModel_1 = __importDefault(require("../models/investimentosModel"));
const ativosModel_1 = __importDefault(require("../models/ativosModel"));
const clientesModel_1 = __importDefault(require("../models/clientesModel"));
const contaModel_1 = __importDefault(require("../models/contaModel"));
const contaService_1 = __importDefault(require("./contaService"));
// Função auxiliar para verificar se o cliente ja existe ou não
const verificaCliente = (CodCliente) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield clientesModel_1.default.getClientes();
    const existeCliente = clientes.some((item) => item.CodCliente === CodCliente);
    if (!existeCliente)
        return false;
    return true;
});
const postComprar = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente, QtdeAtivo, CodAtivo } = body;
    // Verificação se existe cadastro do cliente antes de realizar transações
    const existeCliente = yield verificaCliente(CodCliente);
    if (!existeCliente)
        return 'Código do cliente não encontrado';
    const ativos = yield ativosModel_1.default.getAtivos();
    const ativo = ativos.filter((item) => item.CodAtivo === CodAtivo).find((item) => item);
    if (!ativo)
        return false;
    const valorUnitario = ativo && ativo.ValorUnitario;
    // Verificação de saldo do cliente
    const saldo = yield contaModel_1.default.getSaldoByClient(CodCliente);
    if (saldo[0].Valor < QtdeAtivo * valorUnitario)
        return 'Saldo insuficiente para compra';
    const QtdeCorretora = ativo && ativo.QtdeCorretora;
    // Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora
    if (QtdeAtivo > QtdeCorretora)
        return 'CodAtivo incorreto ou Quantidade do Ativo indisponível na corretora';
    const QtdeAtual = QtdeCorretora - QtdeAtivo; // Atualizando quantidade do ativo na Corretora
    yield ativosModel_1.default.updateAtivo(CodAtivo, QtdeAtual);
    // Atualizar a quantidade de saldo da carteira
    yield contaService_1.default.postSaque(CodCliente, QtdeAtivo * valorUnitario);
    const { insertId } = yield investimentosModel_1.default.postComprar(body);
    return insertId;
});
const postVender = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente, QtdeAtivo, CodAtivo } = body;
    // Verificação se existe cadastro do cliente antes de realizar transações
    const existeCliente = yield verificaCliente(CodCliente);
    if (!existeCliente)
        return 'Código do cliente não encontrado';
    const investimentos = yield investimentosModel_1.default.getInvestimentos();
    const investimento = investimentos.find((item) => item.CodAtivo === CodAtivo && item.CodCliente === CodCliente && item); /* eslint-disable-line*/
    if (!investimento)
        return 'Ação não encontrada. Reveja os códigos passados.';
    const QtdeCarteira = investimento.QtdeAtivo;
    // Quantidade de ativo a ser vendida não pode ser maior que a quantidade disponível na carteira
    if (QtdeAtivo > QtdeCarteira)
        return 'Quantidade a ser vendida indisponível na carteira';
    // Atualizando quantidade do ativo na Carteira
    const QtdeAtual = QtdeCarteira - QtdeAtivo;
    const response = yield investimentosModel_1.default.postVender(CodCliente, CodAtivo, QtdeAtual);
    // Atualizando quantidade de saldo da carteira
    const ativos = yield ativosModel_1.default.getAtivos();
    const ativo = ativos.filter((item) => item.CodAtivo === CodAtivo).find((item) => item);
    if (!ativo)
        return false;
    const valorUnitario = ativo && ativo.ValorUnitario;
    yield contaService_1.default.postDeposito(CodCliente, QtdeAtivo * valorUnitario);
    return response && true;
});
const getInvestimentos = () => __awaiter(void 0, void 0, void 0, function* () {
    const investimentos = yield investimentosModel_1.default.getInvestimentos();
    return investimentos;
});
exports.default = { postComprar, postVender, getInvestimentos };
