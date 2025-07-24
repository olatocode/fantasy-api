"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/playerRoutes.ts
const express_1 = __importDefault(require("express"));
const player_controller_1 = require("../controllers/player.controller");
const router = express_1.default.Router();
router.post('/', player_controller_1.createPlayer);
exports.default = router;
