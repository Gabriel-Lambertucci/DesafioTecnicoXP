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
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const connection_1 = __importDefault(require("../models/connection"));
dotenv_1.default.config();
const login = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let payload = {};
    const { Nome, Senha } = body;
    const [user] = yield connection_1.default.execute('SELECT * FROM Clientes WHERE UserName = ?', [Nome]);
    if (!user || user.length === 0)
        return false;
    const senhaCorreta = bcrypt_nodejs_1.default.compareSync(Senha, user[0].Senha);
    if (!senhaCorreta)
        return false;
    payload = { UserName: user[0].username, admin: true };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'senhasecreta');
    return token;
});
exports.default = { login };
