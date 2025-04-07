"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const coinSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    rate: { type: Number, required: true },
    index: { type: Number, required: true },
}, { timestamps: true });
exports.Crypto = mongoose_1.default.model("Crypto", coinSchema);
