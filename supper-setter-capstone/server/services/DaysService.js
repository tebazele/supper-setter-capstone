import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { logger } from "../utils/Logger.js"
import { plannedMealsService } from "./PlannedMealsService.js"



class DaysService {
  async removeDay(dayId, creatorId) {
    const foundDay = await dbContext.Days.findById(dayId).populate('mealPlan')
    if (!foundDay) throw new BadRequest(`no day at id: ${dayId}`)
    // @ts-ignore
    if (foundDay.mealPlan.creatorId.toString() != creatorId) throw new Forbidden(`Cannot delete a day thats not yours`)

    foundDay.remove()
    // TODO PUT request to re-sequence all days
    return `this day has been deleted`

  }

  async createDay(body) {
    // NOTE Find all days associated with this meal plan and send up Day NUMBER based on how many there are
    const daysArray = await dbContext.Days.find({ mealPlanId: body.mealPlanId })
    const numberOfDays = daysArray.length
    body.name = `Day ${numberOfDays + 1}`

    const day = await dbContext.Days.create(body)
    await day.populate('mealPlan')
    return day
  }

  async getMealPlanDays(mealPlanId) {
    const days = await dbContext.Days.find({ mealPlanId }).populate('mealPlan')
    return days
  }

  async removeDaysByMealPlan(mealPlanId) {
    const days = await dbContext.Days.find({ mealPlanId }).populate('mealPlan')
    await plannedMealsService.removePlannedMealsByDay(days)
    await dbContext.Days.deleteMany({ mealPlanId }).populate('mealPlan')
  }
}



export const daysService = new DaysService()