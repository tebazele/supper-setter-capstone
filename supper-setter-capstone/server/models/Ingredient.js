import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const IngredientSchema = new Schema({
  food: { type: String, required: true },
  measure: { type: String },
  quantity: { type: Number, required: true },
  checked: { type: Boolean, default: false },
  recipeId: { type: String },
}, { timestamps: true, toJSON: { virtuals: true } })

