import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { daysService } from "./DaysService.js"

class MealPlansService {
    async createMealPlan(formData) {
        debugger
        logger.log(formData)
        const res = await api.post('/api/mealplans', { "name": formData })
        logger.log(res.data)
        AppState.activeMealPlan = res.data
        daysService.createDay(res.data.id)
        return res.data

    }
}

export const mealPlansService = new MealPlansService()