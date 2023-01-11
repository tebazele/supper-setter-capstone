import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { daysService } from "./DaysService.js"
// import { plannedMealsService } from "./PlannedMealsService.js"

class MealPlansService {
    async createMealPlan(formData) {
        // logger.log(formData)
        const res = await api.post('/api/mealplans', { "name": formData })
        logger.log(res.data)
        AppState.activeMealPlan = res.data

        const day = await daysService.createDay(res.data.id)
        logger.log('This is the day returned from daysService' + day)

        AppState.plannedMeals.push({
            dayId: day.id,
            plannedMeals: []
        })
        logger.log('This is the planned meal object in the AppState' + AppState.plannedMeals)

        return res.data

    }

    async getMyMealPlans() {
        const res = await api.get('account/mealplans')
        logger.log('got my mealplans', res.data)
        AppState.mealPlans = res.data
    }

    async getMealPlanById(mealPlanId) {
        const res = await api.get('/api/mealplans/' + mealPlanId)
        AppState.activeMealPlan = res.data
    }
}

export const mealPlansService = new MealPlansService()