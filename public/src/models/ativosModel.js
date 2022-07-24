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
const getAtivos = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.execute('SELECT * FROM Ativos');
    return result;
});
const getByAtivo = (CodAtivo) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.execute('SELECT CodAtivo, QtdeCorretora AS QtdeAtivo, ValorUnitario as Valor FROM Ativos WHERE CodAtivo = ?', [CodAtivo]);
    return result;
});
const updateAtivo = (CodAtivo, QtdeAtual) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.execute('UPDATE Ativos SET QtdeCorretora = ? WHERE CodAtivo = ?', [QtdeAtual, CodAtivo]);
});
const getByClient = (CodCliente) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.execute('SELECT CodCliente, CodAtivo, QtdeAtivo FROM Investimentos WHERE CodCliente = ?', [CodCliente]);
    const result2 = result.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const [response] = yield connection_1.default.execute('SELECT CodAtivo, ValorUnitario AS Valor FROM Ativos WHERE CodAtivo = ?', [item.CodAtivo]);
        return response[0];
    }));
    const result3 = yield Promise.all(result2);
    const returnArray = result.map((item) => {
        var _a;
        return (Object.assign(Object.assign({}, item), { Valor: (_a = result3.find((element) => element.CodAtivo === item.CodAtivo)) === null || _a === void 0 ? void 0 : _a.Valor }));
    });
    return returnArray;
});
exports.default = {
    getAtivos, updateAtivo, getByClient, getByAtivo,
};
