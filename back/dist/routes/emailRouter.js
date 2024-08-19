"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../controller/emailController");
const router = (0, express_1.Router)();
router.post('/email', emailController_1.emailController);
exports.default = router;
