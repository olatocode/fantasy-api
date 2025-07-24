"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../controllers/team.controller");
const router = (0, express_1.Router)();
router.post('/', team_controller_1.createTeam);
router.get('/:leagueId', team_controller_1.getTeamsByLeague);
exports.default = router;
