import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId
export const RecipeSchema = new Schema({
  label: { type: String, required: true },
  image: { type: String, required: true },
  // ingredients: { type: Array },
  accountId: { type: ObjectId, required: true, ref: 'Account' },
  uniqueUrl: { type: String, required: true },
  edamamId: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

RecipeSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// TODO we need something universally identifying about all recipes, I suspect uniqueUrl is just that but in that case we will need to change the virtual on Planned meals to actually be able to find and delete all instances of a meal inside of our days