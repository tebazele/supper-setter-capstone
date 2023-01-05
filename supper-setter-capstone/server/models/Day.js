import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId
export const DaySchema = new Schema({
  mealPlanId: { type: ObjectId, required: true, ref: 'MealPlan' },
  // breakfastRecipes: { type: Array, required: true, default: [] },
  // lunchRecipes: { type: Array, required: true, default: [] },
  // dinnerRecipes: { type: Array, required: true, default: [] }
}, { timestamps: true, toJSON: { virtuals: true } })


DaySchema.virtual('mealPlan', {
  localField: 'mealPlanId',
  ref: 'MealPlan',
  foreignField: '_id',
  justOne: true
})