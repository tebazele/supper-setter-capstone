import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const MealPlanSchema = new Schema({
    name: { type: String, default: 'My Meal Plan', maxLength: 30 },
    days: { type: Array, required: true },
    creatorId: { type: ObjectId, required: true, ref: 'Account' },

}, { timestamps: true, toJSON: { virtuals: true } })

MealPlanSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})