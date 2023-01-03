import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class DaysService {

  async createDay(body) {
    const day = await dbContext.Days.create(body)
    await day.populate('mealPlan')
    return day
  }

  async getMealPlanDays(mealPlanId) {
    const days = await dbContext.Days.find({ mealPlanId }).populate('mealPlan')
    return days
  }

}





export const daysService = new DaysService()