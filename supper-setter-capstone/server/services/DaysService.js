import { dbContext } from "../db/DbContext"



class DaysService {

  async createDay(body) {
    const mealPlan = await dbContext.MealPlan.findById(body.mealPlanId)
    const day = await dbContext.Days.create(body)
    await day.populate('mealPlan')
    mealPlan.save()
    return day
  }



}





export const daysService = new DaysService()