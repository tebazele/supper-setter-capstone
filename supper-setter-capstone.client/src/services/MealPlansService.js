import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class MealPlansService {
    async createMealPlan(formData) {
        logger.log(formData)
        const res = await api.post('/api/mealplans', { "name": formData })
        logger.log(res.data)
    }
}

export const mealPlansService = new MealPlansService()