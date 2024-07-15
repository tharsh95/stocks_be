import axios from "axios";

import { Crypto } from "../../models/CoinModel";
import { io } from "../..";

let cryptoCode = "BTC";
let i = 1;

export const pollData = async (): Promise<void> => {
  try {
    const { data } = await axios.post(
      process.env.CRYPTO_URL as string,
      {
        currency: "USD",
        code: cryptoCode,
        meta: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_TOKEN as string,
        },
      }
    );

    const coinData = {
      name: data.name,
      symbol: data.webp64,
      rate: data.rate,
      index: i++,
    };

    await Crypto.create(coinData);

    const entries = await Crypto.find({ name: data.name })
      .sort({ createdAt: -1 })
      .limit(20);

    io.emit("new-data", { data: entries, symbol: cryptoCode, count: entries.length });
  } catch (error) {
    console.error("Error polling data:", error);
  }
};

export const updateCryptoCode = (code: string): void => {
  cryptoCode = code;
};
