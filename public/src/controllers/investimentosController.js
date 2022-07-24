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
const investimentosService_1 = __importDefault(require("../services/investimentosService"));
const postComprar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield investimentosService_1.default.postComprar(req.body);
    if (typeof id === 'string')
        return res.status(409).json({ message: id });
    return res.status(200).json({ message: 'Compra realizada com sucesso!', Compra: req.body });
});
const postVender = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield investimentosService_1.default.postVender(req.body);
    if (typeof id === 'string' || !id)
        return res.status(409).json({ message: id });
    return res.status(200).json({ message: 'Venda realizada com sucesso!', Venda: req.body });
});
const getInvestimentos = (__req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const investimentos = yield investimentosService_1.default.getInvestimentos();
    return res.status(200).json(investimentos);
});
exports.default = { postComprar, postVender, getInvestimentos };
