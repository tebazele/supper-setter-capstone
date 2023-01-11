import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { plannedMealsService } from "./PlannedMealsService.js"


class ShoppingListService {

  async getShoppingListByDayId(dayId) {
    logger.log(dayId, 'this is id')
    const day = await plannedMealsService.getPlannedMealsByDayId(dayId)
    logger.log(day.data.plannedMeals, 'this is day meals')
    AppState.shoppingList = day.data.plannedMeals

  }

}
export const shoppingListService = new ShoppingListService()