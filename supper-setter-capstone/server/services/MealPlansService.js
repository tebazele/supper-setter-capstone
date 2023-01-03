
import { DaysController } from "../controllers/DaysController"
import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { logger } from "../utils/Logger"




class MealPlansService {

  async getAccountMealPlans(accountId) {
    const mealPlans = await dbContext.MealPlan.find({ accountId })
    return mealPlans
  }

  async getOneMealPlan(id) {
    const mealPlan = await dbContext.MealPlan.findById(id)
    if (!mealPlan) {
      throw new BadRequest(`no mealPlan at ${id}`)
    }
    return mealPlan
  }

  async createMealPlan(body) {
    const newMealPlan = await dbContext.MealPlan.create(body)
    return newMealPlan
  }


}


export const mealPlansService = new MealPlansService()