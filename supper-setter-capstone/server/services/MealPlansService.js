
import { DaysController } from "../controllers/DaysController"
import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { logger } from "../utils/Logger"
import { daysService } from "./DaysService.js"




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

  async removeMealPlan(mealPlanId, accountId) {
    const mealPlan = await dbContext.MealPlan.findById(mealPlanId).populate('creator')
    daysService.removeDaysByMealPlan(mealPlanId)
    if (!mealPlan) throw new BadRequest('No meal plan located with this ID')
    // @ts-ignore
    if (mealPlan.creatorId.toString() != accountId) throw new BadRequest('You do not have permission to remove this meal plan')

    daysService.removeDaysByMealPlan(mealPlanId)
    await mealPlan.remove()

    return `${mealPlan.name} and associated days have been deleted`
  }
}


export const mealPlansService = new MealPlansService()