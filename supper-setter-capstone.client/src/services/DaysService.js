import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { plannedMealsService } from "../services/PlannedMealsService.js"


class DaysService {

  async createDay(mealPlanId) {
    AppState.plannedMeals = null
    const res = await api.post('api/days', { mealPlanId })
    logger.log(res.data)
    AppState.activeDays.push(res.data)
    return res.data

  }

  async getDays(mealPlanId) {
    const res = await api.get('api/mealplans/' + mealPlanId + '/days')

    AppState.activeDays = res.data

    // await plannedMealsService.getPlannedMeals(AppState.activeDays)


  }

}

export const daysService = new DaysService()