import mongoose, { Schema, Document, Model } from "mongoose";

// Interface e Schema para User
interface IUser extends Document {
  consumoAlimentos: mongoose.Types.ObjectId;
  macroIdeal: mongoose.Types.ObjectId;
  macroReal: mongoose.Types.ObjectId;
  metrica: mongoose.Types.ObjectId;
  ingestaoAgua: mongoose.Types.ObjectId;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  consumoAlimentos: { type: mongoose.Schema.Types.ObjectId, ref: "Alimento" },
  macroIdeal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MacroNutrientesIdeal",
  },
  macroReal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MacroNutrientesReal",
  },
  metrica: { type: mongoose.Schema.Types.ObjectId, ref: "Metrica" },
  ingestaoAgua: { type: mongoose.Schema.Types.ObjectId, ref: "Agua" },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
