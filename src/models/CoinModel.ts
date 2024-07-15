import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICrypto extends Document {
  name: string;
  symbol: string;
  rate: number;
  index: number;
  createdAt: Date;
  updatedAt: Date;
}

const coinSchema: Schema<ICrypto> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    rate: { type: Number, required: true },
    index: { type: Number, required: true },
  },
  { timestamps: true }
);


export const Crypto: Model<ICrypto> = mongoose.model<ICrypto>("Crypto", coinSchema);

