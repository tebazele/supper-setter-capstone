import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class DaysService {

  async createDay(body) {
    const mealPlan = await dbContext.MealPlan.findById(body.id)
    if (!mealPlan) {
      throw new BadRequest('no meal plan found')
    }
    const day = await dbContext.Days.create(body)
    await day.populate('mealPlan')
    mealPlan.save()
    return day
  }



}





export const daysService = new DaysService()