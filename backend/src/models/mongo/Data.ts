import mongoose, { Schema, Document, Model } from "mongoose";

// Interface e Schema para Data
interface IData extends Document {
  usuario: mongoose.Types.ObjectId;
  data_atual: Date;
  peso: number;
  metricaHist: mongoose.Types.ObjectId;
  agua: mongoose.Types.ObjectId;
}

const DataSchema: Schema = new Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  data_atual: { type: Date, required: true },
  peso: { type: Number, required: true },
  metricaHist: { type: mongoose.Schema.Types.ObjectId, ref: "Metrica" },
  agua: { type: mongoose.Schema.Types.ObjectId, ref: "Agua" },
});

const Data = mongoose.model<IData>("Data", DataSchema);
export default Data;
