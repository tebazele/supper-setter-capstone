import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId
export const DaySchema = new Schema({
    recipes: { type: Array },
    // creatorId: { type: ObjectId, required: true, ref: 'Account' },
    mealPlanId: { type: ObjectId, required: true, ref: 'MealPlan' },

}, { timestamps: true, toJSON: { virtuals: true } })

// DaySchema.virtual('creator', {
//     localField: 'creatorId',
//     ref: 'Account',
//     foreignField: '_id',
//     justOne: true
// })

DaySchema.virtual('mealPlan', {
    localField: 'mealPlanId',
    ref: 'MealPlan',
    foreignField: '_id',
    justOne: true
})