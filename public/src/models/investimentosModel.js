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
const connection_1 = __importDefault(require("./connection"));
const getInvestimentos = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.execute('SELECT * FROM Investimentos');
    return result;
});
const postComprar = (body) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificando se o cliente ja possui investimento nesse ativo
    const investimentos = yield getInvestimentos();
    const investimento = investimentos.find((item) => item.CodCliente === body.CodCliente && item.CodAtivo === body.CodAtivo); /* eslint-disable-line*/
    // Se possuir, somente atualizamos a quatidade do ativo em sua carteira
    if (investimento) {
        const QtdeAtual = investimento.QtdeAtivo + body.QtdeAtivo;
        const [response] = yield connection_1.default.execute('UPDATE Investimentos SET QtdeAtivo = ? WHERE CodCliente = ? AND CodAtivo = ?', [QtdeAtual, body.CodCliente, body.CodAtivo]);
        return response;
    }
    // Se não, além de atualizarmos a quatidade do ativo em sua carteira,
    // inserimos uma nova linha na tabela investimentos
    const [result] = yield connection_1.default.execute('INSERT INTO Investimentos(CodCliente, CodAtivo, QtdeAtivo ) VALUES (?, ?, ?)', [body.CodCliente, body.CodAtivo, body.QtdeAtivo]);
    return result;
});
const postVender = (CodCliente, CodAtivo, QtdeAtual) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.execute('UPDATE Investimentos SET QtdeAtivo = ? WHERE CodCliente = ? AND CodAtivo = ?', [QtdeAtual, CodCliente, CodAtivo]);
    return result;
});
exports.default = { postComprar, postVender, getInvestimentos };
