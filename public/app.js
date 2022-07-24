"use strict";
// Configurando express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
require('express-async-errors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(errorMiddleware_1.default);
app.use(routes_1.default);
exports.default = app;
