import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class DaysService {

  async createDay(mealPlanId) {
    debugger
    const res = await api.post('api/days', { mealPlanId })
    logger.log(res.data)
  }

  async getDays(mealPlanId) {
    const res = await api.get('api/mealplans/' + mealPlanId + '/days')
    AppState.activeDays = res.data
  }

}

export const daysService = new DaysService()