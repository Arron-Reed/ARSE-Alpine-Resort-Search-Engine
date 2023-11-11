"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VerifyTokenMiddleware = (req, res, next) => {
    const headerValue = req.headers['authorization'];
    try {
        if (headerValue != null) {
            const token = headerValue.split(' ')[1];
            jsonwebtoken_1.default.verify(token, 'secret', (err) => {
                if (err) {
                    return res.status(403).send('You do not have permission to view this content');
                }
                else {
                    next();
                }
            });
        }
        else {
            return res.status(401).send('Unauthorized: There is no authorization header');
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Token verification failed' });
    }
};
exports.default = VerifyTokenMiddleware;
