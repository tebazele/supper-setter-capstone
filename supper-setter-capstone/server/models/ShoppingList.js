import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const ShoppingListSchema = new Schema({
  dayId: { type: ObjectId, ref: 'Day' },
  mealPlanId: { type: ObjectId, ref: 'MealPlan' },
  ingredients: { type: [Object] }
}, { timestamps: true, toJSON: { virtuals: true } })

// ShoppingListSchema.virtual('day', {
//   localField: 'dayId',
//   ref: 'Day',
//   foreignField: '_id',
//   justOne: true
// })

// ShoppingListSchema.virtual('mealplan', {
//   localField: 'mealPlanId',
//   ref: 'PlannedMeal',
//   foreignField: '_id',
//   justOne: true
// })