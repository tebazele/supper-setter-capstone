import { Schema } from "mongoose";

const IngredientSchema = new Schema({
  food: { type: String, required: true },
  measure: { type: String },
  quantity: { type: Number },
  checked: { type: Boolean, default: false }
})

const ObjectId = Schema.Types.ObjectId
export const RecipeSchema = new Schema({
  label: { type: String, required: true },
  image: { type: String, required: true },
  // ingredients: { type: Array },
  accountId: { type: ObjectId, required: true, ref: 'Account' },
  uniqueUrl: { type: String, required: true },
  edamamId: { type: String, required: true },
  archived: { type: Boolean, required: true, default: false },
  ingredients: { type: [IngredientSchema], required: true }
  // TODO look at default 
}, { timestamps: true, toJSON: { virtuals: true } })

RecipeSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

