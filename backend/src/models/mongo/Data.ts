import mongoose, { Schema, Document, Model } from "mongoose";
import { AguaSchema, IAgua, IMetrica, MetricaSchema } from "./User";

// Interface para Data
interface IData extends Document {
  usuario: mongoose.Types.ObjectId;
  data_atual: Date;
  peso: number;
  metricaHist: IMetrica;
  agua: IAgua;
}

// Schema para Data (documento principal)
const DataSchema: Schema = new Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  data_atual: { type: Date, required: true },
  peso: { type: Number},
  metricaHist: MetricaSchema,
  agua: AguaSchema,
});

const Data = mongoose.model<IData>("Data", DataSchema);

export default Data;
