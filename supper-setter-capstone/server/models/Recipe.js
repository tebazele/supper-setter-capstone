import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId
export const RecipeSchema = new Schema({
    label: { type: String, required: true },
    image: { type: String, required: true },
    // ingredients: { type: Array },
    accountId: { type: ObjectId, required: true, ref: 'Account' },
    uniqueUrl: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })