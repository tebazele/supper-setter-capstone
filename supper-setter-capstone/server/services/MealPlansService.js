
import { DaysController } from "../controllers/DaysController"
import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { logger } from "../utils/Logger"
import { daysService } from "./DaysService.js"




class MealPlansService {

  async getAccountMealPlans(creatorId) {
    const mealPlans = await dbContext.MealPlan.find({ creatorId }).populate('creator')
    return mealPlans
  }

  async getOneMealPlan(id) {
    const mealPlan = await dbContext.MealPlan.findById(id).populate('creator')
    if (!mealPlan) {
      throw new BadRequest(`no meal plan at ${id}`)
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

    await daysService.removeDaysByMealPlan(mealPlanId)
    await mealPlan.remove()

    return `${mealPlan.name} and associated days have been deleted`
  }


  async checkIfShopList(mealPlanId) {
    const mealPlan = await this.getOneMealPlan(mealPlanId)
    mealPlan.shopListGenerated = !mealPlan.shopListGenerated
    await mealPlan.save()
  }
}


export const mealPlansService = new MealPlansService()