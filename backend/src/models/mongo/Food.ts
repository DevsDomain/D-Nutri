import mongoose, { Schema, Document } from "mongoose";

export interface IFood extends Document {
  name: string;
  quantity: number; // Quantidade em peso
  user: mongoose.Types.ObjectId; // Referência ao usuário
}

const FoodSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Food = mongoose.model<IFood>("Food", FoodSchema);
export default Food;
