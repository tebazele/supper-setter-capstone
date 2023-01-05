import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { logger } from "../utils/Logger.js"



class DaysService {
  removeDay(dayId, id) {
    throw new Error("Method not implemented.")
  }

  async createDay(body) {
    const day = await dbContext.Days.create(body)
    await day.populate('mealPlan')
    return day
  }

  async getMealPlanDays(mealPlanId) {
    const days = await dbContext.Days.find({ mealPlanId }).populate('mealPlan')
    return days
  }

  async removeDaysByMealPlan(mealPlanId) {
    await dbContext.Days.deleteMany({ mealPlanId }).populate('mealPlan')
  }

}



export const daysService = new DaysService()