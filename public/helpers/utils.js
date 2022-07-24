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
exports.validaToken = exports.validaCliente = exports.validaObjeto = exports.totalCarteira = exports.totalCorretora = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const totalCorretora = 100;
exports.totalCorretora = totalCorretora;
const totalCarteira = 20;
exports.totalCarteira = totalCarteira;
// Validação de objeto completo para requisição post de compra e venda
const validaObjeto = (input) => {
    const schema = joi_1.default.object({
        CodCliente: joi_1.default.number().integer().required(),
        CodAtivo: joi_1.default.number().integer().required(),
        QtdeAtivo: joi_1.default.number().required(),
    }).messages({
        'any.required': '{{#label}} is required',
    });
    return schema.validate(input, { abortEarly: false });
};
exports.validaObjeto = validaObjeto;
// Validação de objeto para Login de usuário
const validaCliente = (input) => {
    const schema = joi_1.default.object({
        Nome: joi_1.default.string().required(),
        Senha: joi_1.default.string().required(),
    }).messages({
        'any.required': '{{#label}} is required',
    });
    return schema.validate(input, { abortEarly: false });
};
exports.validaCliente = validaCliente;
const validaToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        return false;
    }
    try {
        const validate = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || 'senhasecreta');
        return validate;
    }
    catch (error) {
        throw new Error('token inválido');
    }
});
exports.validaToken = validaToken;
