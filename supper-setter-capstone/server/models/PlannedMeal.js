import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId
export const PlannedMealSchema = new Schema({
  dayId: { type: ObjectId, required: true, ref: 'Day' },
  recipeId: { type: ObjectId, required: true, ref: 'Recipe' },
  type: { type: String, required: true, enum: ['breakfast', 'lunch', 'dinner'] }
}, { timestamps: true, toJSON: { virtuals: true } })

PlannedMealSchema.virtual('day', {
  localField: 'dayId',
  ref: 'Day',
  foreignField: '_id',
  justOne: true
})

PlannedMealSchema.virtual('recipe', {
  localField: 'recipeId',
  ref: 'Recipe',
  foreignField: '_id',
  justOne: true
})