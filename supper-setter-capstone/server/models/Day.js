import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId
export const DaySchema = new Schema({
  name: { type: String, required: true, default: 'Day 1' },
  mealPlanId: { type: ObjectId, required: true, ref: 'MealPlan' },
  shopListGenerated: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })


DaySchema.virtual('mealPlan', {
  localField: 'mealPlanId',
  ref: 'MealPlan',
  foreignField: '_id',
  justOne: true
})