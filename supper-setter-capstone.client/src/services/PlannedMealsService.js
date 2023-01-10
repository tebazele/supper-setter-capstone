import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PlannedMealsService {

    async getPlannedMeals(daysArray) {
        const allPlannedMeals = []
        for (let i = 0; i < daysArray.length; i++) {
            let res = await api.get('api/days/' + daysArray[i]._id + '/plannedmeals')

            allPlannedMeals.push(res.data)
            // FIXME bring in as array of objects with Day Name as the key and the array of planned meals as the value?
        }
        AppState.plannedMeals = allPlannedMeals

        // TODO loop through daysArray and get all plannedmeals associated with each day
        // STUB do we want to sort them by day here or on the page? We could push arrays of planned meals to a superset array of all meals associated with the mealplan
        // TODO we'll still have to sort by meal type on the page
    }

    async deletePlannedMeal(plannedMealId) {
        let newPlannedMealArray = []
        const res = await api.delete('/api/plannedmeals/' + plannedMealId)
        for (let i = 0; i < AppState.plannedMeals.length; i++) {
            newPlannedMealArray.push(AppState.plannedMeals[i].filter(p => p.id != plannedMealId))

        }

        AppState.plannedMeals = newPlannedMealArray

        return res.data
    }

    async createPlannedMeal(recipeId) {

        const foundDay = AppState.activeDays.find(d => d.name == AppState.activePlannedMealRequestBody.dayName)
        logger.log(foundDay)
        const mealType = AppState.activePlannedMealRequestBody.mealType

        const res = await api.post('/api/plannedmeals', {
            "dayId": foundDay.id,
            "recipeId": recipeId,
            "type": mealType
        })

        logger.log(res.data)
        // TODO push to AppState somehow
        AppState.plannedMeals

    }

}
export const plannedMealsService = new PlannedMealsService()