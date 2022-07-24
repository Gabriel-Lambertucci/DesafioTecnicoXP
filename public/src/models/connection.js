"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = promise_1.default.createPool({
    host: 'remotemysql.com',
    user: 'hE8vWmxhKd',
    password: '9KtJCkUOXh',
    database: 'hE8vWmxhKd',
});
exports.default = connection;
