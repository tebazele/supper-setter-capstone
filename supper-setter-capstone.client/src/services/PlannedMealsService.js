class PlannedMealsService {

    async getPlannedMeals(daysArray) {
        // TODO loop through daysArray and get all plannedmeals associated with each day
        // STUB do we want to sort them by day here or on the page? We could push arrays of planned meals to a superset array of all meals associated with the mealplan
        // TODO we'll still have to sort by meal type on the page
        throw new Error(`not implemented yet`)
    }

}
export const plannedMealsService = new PlannedMealsService()