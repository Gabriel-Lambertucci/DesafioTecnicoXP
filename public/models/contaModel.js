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
const getSaldoByClient = (CodCliente) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.execute('SELECT Saldo as Valor FROM Conta WHERE CodCliente = ?', [CodCliente]);
    return result;
});
const postConta = (CodCliente) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.execute('INSERT INTO Conta (CodCliente, Saldo) VALUES (?,?)', [CodCliente, 0]);
});
const updateConta = (CodCliente, Saldo) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.execute('UPDATE Conta SET Saldo = ? WHERE CodCliente = ?', [Saldo, CodCliente]);
});
const getContaByClient = (CodCliente) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.execute('SELECT CodCliente, Saldo FROM Conta WHERE CodCliente = ?', [CodCliente]);
    return result;
});
exports.default = {
    getSaldoByClient,
    postConta,
    updateConta,
    getContaByClient,
};
