import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const MealPlanSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  shopListGenerated: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })

MealPlanSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})