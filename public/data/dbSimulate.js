"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaldo = exports.postSaque = exports.postDeposito = exports.getByAsset = exports.getByClient2 = exports.getByClient1 = exports.postInvestimentosVender = exports.postInvestimentosComprar = void 0;
const postInvestimentosComprar = {
    "CodAtivo": 85,
    "CodCliente": 1,
    "QtdeAtivo": 20,
};
exports.postInvestimentosComprar = postInvestimentosComprar;
const postInvestimentosVender = {
    "CodAtivo": 85,
    "CodCliente": 1,
    "QtdeAtivo": 20,
};
exports.postInvestimentosVender = postInvestimentosVender;
const getByClient1 = {
    "CodCliente": 5,
    "CodAtivo": 55,
    "QtdeAtivo": 10,
    "Valor": 130.55,
};
exports.getByClient1 = getByClient1;
const getByClient2 = {
    "CodCliente": 5,
    "CodAtivo": 130,
    "QtdeAtivo": 5,
    "Valor": 90.00,
};
exports.getByClient2 = getByClient2;
const getByAsset = {
    "CodAtivo": 15,
    "QtdeAtivo": 1000,
    "Valor": 10.00,
};
exports.getByAsset = getByAsset;
const postDeposito = {
    "CodCliente": 3,
    "Valor": 1000.00,
};
exports.postDeposito = postDeposito;
const postSaque = {
    "CodCliente": 3,
    "Valor": 1000.00,
};
exports.postSaque = postSaque;
const getSaldo = {
    "CodCliente": 2,
    "Saldo": 550.35,
};
exports.getSaldo = getSaldo;
