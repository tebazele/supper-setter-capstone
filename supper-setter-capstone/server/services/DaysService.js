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

    const mealPlanId = foundDay.mealPlanId

    await foundDay.remove()
    // NOTE PUT request to re-sequence all day names
    let editedDaysArray = []
    const daysRemaining = await dbContext.Days.find({ mealPlanId })

    for (let i = 0; i < daysRemaining.length; i++) {
      let editedDay = daysRemaining[i]
      editedDay.name = `Day ${i + 1}`;
      (await editedDay.save()).populate('mealPlan')
      editedDaysArray.push(editedDay)
    }

    return editedDaysArray

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


  async getDayInfoByDayId(dayId) {
    const day = await dbContext.Days.findById(dayId).populate('mealPlan')
    return day
  }
  async checkShopList(dayId) {
    const day = await this.getDayInfoByDayId(dayId)
    if (!day) { throw new BadRequest("There was no day found to generate a list for") }
    day.shopListGenerated = !day.shopListGenerated
    await day.save()
  }


}



export const daysService = new DaysService()