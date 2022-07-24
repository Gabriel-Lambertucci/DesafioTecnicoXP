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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helpers/utils");
const postComprarMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.headers.authorization;
    // Validando atributos Objeto de Requisição de compra
    const isValid = yield (0, utils_1.validaObjeto)(req.body);
    const message = (_a = isValid.error) === null || _a === void 0 ? void 0 : _a.message;
    if (message) {
        return res.status(400).json({ message });
    }
    // Validando token
    const isTokenValid = yield (0, utils_1.validaToken)(token);
    if (!isTokenValid)
        return res.status(400).json({ message: 'token Inválido ' });
    return next();
});
const postVenderMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = req.headers.authorization;
    // Validando atributos Objeto de Requisição de venda
    const isValid = yield (0, utils_1.validaObjeto)(req.body);
    const message = (_b = isValid.error) === null || _b === void 0 ? void 0 : _b.message;
    if (message) {
        return res.status(400).json({ message });
    }
    // Validando token
    const isTokenValid = yield (0, utils_1.validaToken)(token);
    if (!isTokenValid)
        return res.status(400).json({ message: 'token Inválido ' });
    return next();
});
exports.default = { postComprarMiddleware, postVenderMiddleware };
