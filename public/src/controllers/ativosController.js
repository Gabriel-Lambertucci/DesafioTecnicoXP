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
const ativosService_1 = __importDefault(require("../services/ativosService"));
const getAtivos = (__req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ativos = yield ativosService_1.default.getAtivos();
    if (!ativos)
        return res.status(404).json({ message: 'Erro inesperado, tente novamente' });
    return res.status(200).json(ativos);
});
const getByAtivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ativo = yield ativosService_1.default.getByAtivo(parseInt(req.params.CodAtivo, 10));
    if (!ativo || ativo.length === 0)
        return res.status(404).json({ message: 'Ativo não encontrado!' });
    return res.status(200).json(...ativo);
});
const getByClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ativosService_1.default.getByClient(parseInt(req.params.CodCliente, 10));
    if (!response || response.length === 0)
        return res.status(404).json({ message: 'Usuário não possui ativos no momento' });
    return res.status(200).json(response);
});
exports.default = { getAtivos, getByClient, getByAtivo };
