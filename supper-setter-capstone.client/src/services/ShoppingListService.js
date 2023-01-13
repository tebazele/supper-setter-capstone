import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { plannedMealsService } from "./PlannedMealsService.js"
import { daysService } from "./DaysService.js"
import { generateId } from "../utils/GenerateId.js"


class ShoppingListService {

  async getShoppingListByDayId(dayId) {

    const ingredients = []

    logger.log(dayId, 'this is id')
    const day = await plannedMealsService.getPlannedMealsByDayId(dayId)
    logger.log(day.data.plannedMeals, 'this is day meals')
    for (let i = 0; i < day.data.plannedMeals.length; i++) {
      const elm = day.data.plannedMeals[i];
      for (let j = 0; j < elm.recipe.ingredients.length; j++) {
        let ingredient = elm.recipe.ingredients[j]
        ingredient.recipeId = elm.recipe.id
        ingredient.id = generateId()
        ingredients.push(ingredient)
      }
      logger.log(ingredients)
    }
    const sorted = ingredients.sort(function (a, b) {
      return a.food.localeCompare(b.food);
    })
    AppState.shoppingList = ingredients
    logger.log('app state shopping list', AppState.shoppingList)
  }

  async getShoppingListByMealPlanId(mealPlanId) {
    const plannedMealsArray = []
    const ingredients = []
    await daysService.getDays(mealPlanId)
    logger.log(AppState.activeDays, "Got days by Meal Plan ID")
    let daysArray = AppState.activeDays
    for (let i = 0; i < daysArray.length; i++) {
      let meals = await plannedMealsService.getPlannedMealsByDayId(daysArray[i].id)
      plannedMealsArray.push(...meals.data.plannedMeals)
      for (let j = 0; j < plannedMealsArray.length; j++) {
        const elm = plannedMealsArray[j];
        for (let k = 0; k < elm.recipe.ingredients.length; k++) {
          let ingredient = elm.recipe.ingredients[k]
          ingredient.recipeId = elm.recipe.id
          ingredient.id = generateId()
          ingredients.push(ingredient)
        }
      }
    }
    logger.log(ingredients)
    const sorted = ingredients.sort(function (a, b) {
      return a.food.localeCompare(b.food);
    })
    AppState.shoppingList = ingredients
    logger.log('app state shopping list', AppState.shoppingList)

  }

}
export const shoppingListService = new ShoppingListService()