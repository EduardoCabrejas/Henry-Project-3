"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORT = exports.OCS = exports.OCID = exports.EMPS = exports.EMUS = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT || 3000;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_NAME = process.env.DB_NAME;
// Credenciales de correo electrónico
exports.EMUS = process.env.EMAIL_USER;
exports.EMPS = process.env.EMAIL_PASS;
exports.OCID = process.env.OAUTH_CLIENTID;
exports.OCS = process.env.OAUTH_CLIENT_SECRET;
exports.ORT = process.env.OAUTH_REFRESH_TOKEN;
