import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PlannedMealsService {

    async getPlannedMeals(daysArray) {
        logger.log(daysArray)
        const allPlannedMeals = []
        for (let i = 0; i < daysArray.length; i++) {
            let res = await api.get('api/days/' + daysArray[i]._id + '/plannedmeals')
            logger.log(daysArray[i]._id)
            allPlannedMeals.push(res.data)
        }
        logger.log(allPlannedMeals)
        // AppState.plannedMeals = res.data

        // TODO loop through daysArray and get all plannedmeals associated with each day
        // STUB do we want to sort them by day here or on the page? We could push arrays of planned meals to a superset array of all meals associated with the mealplan
        // TODO we'll still have to sort by meal type on the page
    }

}
export const plannedMealsService = new PlannedMealsService()