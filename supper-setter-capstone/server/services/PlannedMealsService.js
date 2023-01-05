import { dbContext } from "../db/DbContext.js"


class PlannedMealsService {
  async createPlannedMeal(body) {
    const newPlannedMeal = await dbContext.PlannedMeal.create(body)
    return newPlannedMeal
  }

}

export const plannedMealsService = new PlannedMealsService()