import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PlannedMealsService {


  async getPlannedMeals(daysArray) {
    const allPlannedMeals = []
    for (let i = 0; i < daysArray.length; i++) {
      let res = await api.get('api/days/' + daysArray[i]._id + '/plannedmeals')

      allPlannedMeals.push(res.data)

    }
    AppState.plannedMeals = allPlannedMeals

  }

  async getPlannedMealsByDayId(dayId) {
    let meals = await api.get(`api/days/${dayId}/plannedmeals`)
    return meals
  }

  async deletePlannedMeal(plannedMealId) {
    let newPlannedMealArray = []
    const res = await api.delete('/api/plannedmeals/' + plannedMealId)
    for (let i = 0; i < AppState.plannedMeals.length; i++) {
      let dayObj = AppState.plannedMeals[i]
      if (dayObj.plannedMeals.find(p => p.id == plannedMealId)) {
        let changedArray = dayObj.plannedMeals.filter(p => p.id != plannedMealId)
        dayObj.plannedMeals = changedArray
        AppState.plannedMeals.splice(i, 1, dayObj)
      }

      // newPlannedMealArray.push(AppState.plannedMeals[i].plannedMeals.filter(p => p.id != plannedMealId))

    }

    // AppState.plannedMeals = newPlannedMealArray

    return res.data
  }

  async createPlannedMeal(recipeId) {

    // const foundDay = AppState.activeDays.find(d => d.name == AppState.activePlannedMealRequestBody.dayName)
    // logger.log(foundDay)
    const dayId = AppState.activePlannedMealRequestBody.dayId
    const mealType = AppState.activePlannedMealRequestBody.mealType

    const res = await api.post('/api/plannedmeals', {
      "dayId": dayId,
      "recipeId": recipeId,
      "type": mealType
    })

    logger.log(res.data)
    // TODO push to AppState somehow
    const foundDay = AppState.plannedMeals.find(day => day.dayId == dayId)
    foundDay.plannedMeals.push(res.data)
    // this.getPlannedMeals(daysArray)

  }

}
export const plannedMealsService = new PlannedMealsService()