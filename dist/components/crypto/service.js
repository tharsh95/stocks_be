"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCryptoCode = exports.pollData = void 0;
const axios_1 = __importDefault(require("axios"));
const CoinModel_1 = require("../../models/CoinModel");
const __1 = require("../..");
let cryptoCode = "BTC";
let i = 1;
const pollData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.post(process.env.CRYPTO_URL, {
            currency: "USD",
            code: cryptoCode,
            meta: true,
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_TOKEN,
            },
        });
        const coinData = {
            name: data.name,
            symbol: data.webp64,
            rate: data.rate,
            index: i++,
        };
        yield CoinModel_1.Crypto.create(coinData);
        const entries = yield CoinModel_1.Crypto.find({ name: data.name })
            .sort({ createdAt: -1 })
            .limit(20);
        __1.io.emit("new-data", { data: entries, symbol: cryptoCode, count: entries.length });
    }
    catch (error) {
        console.error("Error polling data:", error);
    }
});
exports.pollData = pollData;
const updateCryptoCode = (code) => {
    cryptoCode = code;
};
exports.updateCryptoCode = updateCryptoCode;
