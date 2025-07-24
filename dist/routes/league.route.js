"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const league_controller_1 = require("../controllers/league.controller");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authenticateToken, league_controller_1.getLeagues);
router.post('/', auth_middleware_1.authenticateToken, league_controller_1.createLeague);
exports.default = router;
