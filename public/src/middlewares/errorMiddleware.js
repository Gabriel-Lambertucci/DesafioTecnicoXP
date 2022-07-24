"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    if (err)
        return res.status(500).json({ message: err });
    return next();
};
exports.default = errorMiddleware;
