import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { DaySchema } from '../models/Day.js';
import { MealPlanSchema } from '../models/MealPlan.js';
import { PlannedMealSchema } from '../models/PlannedMeal.js';
import { RecipeSchema } from '../models/Recipe.js';
import { ShoppingListSchema } from "../models/ShoppingList.js";
import { ValueSchema } from '../models/Value'
import { IngredientSchema } from "../models/Ingredient.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  MealPlan = mongoose.model('MealPlan', MealPlanSchema);

  Days = mongoose.model('Day', DaySchema);

  Recipe = mongoose.model('Recipe', RecipeSchema);

  PlannedMeal = mongoose.model('PlannedMeal', PlannedMealSchema);

  Ingredient = mongoose.model('Ingredient', IngredientSchema);

  ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema)

}

export const dbContext = new DbContext()
