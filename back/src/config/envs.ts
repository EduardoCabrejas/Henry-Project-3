import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

// Credenciales de correo electrónico
export const EMUS=process.env.EMAIL_USER
export const EMPS=process.env.EMAIL_PASS
export const OCID=process.env.OAUTH_CLIENTID
export const OCS=process.env.OAUTH_CLIENT_SECRET
export const ORT=process.env.OAUTH_REFRESH_TOKEN