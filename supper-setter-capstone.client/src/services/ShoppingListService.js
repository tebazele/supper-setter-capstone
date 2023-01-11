import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { plannedMealsService } from "./PlannedMealsService.js"


class ShoppingListService {

  async getShoppingListByDayId(dayId) {

    const ingredients = []
    logger.log(dayId, 'this is id')
    const day = await plannedMealsService.getPlannedMealsByDayId(dayId)
    logger.log(day.data.plannedMeals, 'this is day meals')
    for (let i = 0; i < day.data.plannedMeals.length; i++) {
      const elm = day.data.plannedMeals[i];
      ingredients.push(...elm.recipe.ingredients)

    }



    AppState.shoppingList = ingredients
    logger.log('app state shopping list', AppState.shoppingList)

  }

}
export const shoppingListService = new ShoppingListService()