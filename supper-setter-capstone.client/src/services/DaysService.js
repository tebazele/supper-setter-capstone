import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
// import { plannedMealsService } from "../services/PlannedMealsService.js"


class DaysService {

  async createDay(mealPlanId) {
    const res = await api.post('api/days', { mealPlanId })
    // logger.log('new day returned from api' + res.data)

    AppState.activeDays.push(res.data)

    return res.data

  }

  async getDays(mealPlanId) {
    const res = await api.get('api/mealplans/' + mealPlanId + '/days')

    AppState.activeDays = res.data

    // await plannedMealsService.getPlannedMeals(AppState.activeDays)
  }

  async deleteDay(dayId) {
    const res = await api.delete('api/days/' + dayId)
    logger.log(res.data)
    AppState.activeDays = res.data
  }

}

export const daysService = new DaysService()