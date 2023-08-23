import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { plannedMealsService } from "./PlannedMealsService.js"
import { daysService } from "./DaysService.js"
import { generateId } from "../utils/GenerateId.js"
import { api } from "./AxiosService"

class ShoppingListService {


  async getDayShopList(dayId) {
    const shoppinglist = await api.get(`api/days/${dayId}/shoppinglist`)
    AppState.shoppingList = shoppinglist.data
    logger.log("[SHOPPING LIST from backend]", shoppinglist)
  }

  async getMealPlanShopList(mealPlanId) {
    const shoppinglist = await api.get(`api/mealplans/${mealPlanId}/shoppinglist`)
    AppState.shoppingList = shoppinglist.data
    logger.log('shopping list')
  }
  async generateShoppingListByDayId(dayId) {
    const ingredients = []
    const day = await plannedMealsService.getPlannedMealsByDayId(dayId)
    for (let i = 0; i < day.data.plannedMeals.length; i++) {
      const elm = day.data.plannedMeals[i];
      for (let j = 0; j < elm.recipe.ingredients.length; j++) {
        let ingredient = elm.recipe.ingredients[j]
        if (ingredient.measure == '<unit>') {
          ingredient.measure = null
        }
        ingredients.push(ingredient)
      }
    }
    await this.postDayShopList(dayId, ingredients)

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
          if (ingredient.measure == '<unit>') {
            ingredient.measure = null
          }
          ingredients.push(ingredient)
        }
      }
    }
    await this.postMealPlanShopList(mealPlanId, ingredients)
  }



  async postDayShopList(dayId, ingredients) {
    console.log(ingredients)
    const res = await api.post(`api/days/${dayId}/shoppinglist`, ingredients)
    logger.log(res.data)
  }

  async postMealPlanShopList(mealPlanId, ingredients) {
    console.log(ingredients)
    const res = await api.post(`api/mealplans/${mealPlanId}/shoppinglist`, ingredients)
    logger.log(res.data)
  }


  async checkIngredientDay(dayId, ingredientId) {
    await api.put(`api/days/${dayId}/shoppinglist/${ingredientId}`)
  }

  async checkIngredientMealPlan(mealPlanId, ingredientId) {
    await api.put(`api/mealPlans/${mealPlanId}/shoppinglist/${ingredientId}`)
  }

}
// NOTE FOR ALPHABETIZING INGREDIENTS
// const sorted = ingredients.sort(function (a, b) {
//   return a.food.localeCompare(b.food);
// })

export const shoppingListService = new ShoppingListService()