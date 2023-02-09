import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { plannedMealsService } from "./PlannedMealsService.js"
import { daysService } from "./DaysService.js"
import { generateId } from "../utils/GenerateId.js"
import { api } from "./AxiosService"

class ShoppingListService {


  async generateShoppingListByDayId(dayId) {
    const ingredients = []
    const day = await plannedMealsService.getPlannedMealsByDayId(dayId)
    for (let i = 0; i < day.data.plannedMeals.length; i++) {
      const elm = day.data.plannedMeals[i];
      for (let j = 0; j < elm.recipe.ingredients.length; j++) {
        let ingredient = elm.recipe.ingredients[j]
        ingredient.recipeId = elm.recipe.id
        // ingredient.id = generateId()
        ingredients.push(ingredient)
      }
    }
    const sorted = ingredients.sort(function (a, b) {
      return a.food.localeCompare(b.food);
    })
    await this.saveShoppingList(dayId, ingredients)
    AppState.shoppingList = ingredients
  }

  async generateShoppingListByMealPlanId(mealPlanId) {
    const plannedMealsArray = []
    const ingredients = []
    await daysService.getDays(mealPlanId)
    let daysArray = AppState.activeDays
    for (let i = 0; i < daysArray.length; i++) {
      let meals = await plannedMealsService.getPlannedMealsByDayId(daysArray[i].id)
      plannedMealsArray.push(...meals.data.plannedMeals)
      for (let j = 0; j < plannedMealsArray.length; j++) {
        const elm = plannedMealsArray[j];
        for (let k = 0; k < elm.recipe.ingredients.length; k++) {
          let ingredient = elm.recipe.ingredients[k]
          ingredient.recipeId = elm.recipe.id
          // ingredient.id = generateId()
          ingredients.push(ingredient)
        }
      }
      logger.log(ingredients)
    }
    const sorted = ingredients.sort(function (a, b) {
      return a.food.localeCompare(b.food);
    })
    AppState.shoppingList = ingredients
  }


  async saveShoppingList(dayId, ingredients) {
    const res = await api.post('api/shoppinglist', { dayId, ingredients })
    logger.log('response from server', res.data)
    AppState.shoppingList = res.data
  }



}
export const shoppingListService = new ShoppingListService()