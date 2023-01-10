import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class PlannedMealsService {
  async createPlannedMeal(body) {
    const newPlannedMeal = await dbContext.PlannedMeal.create(body)
    await newPlannedMeal.populate('day recipe')
    return newPlannedMeal
  }

  async getPlannedMealsByDayId(dayId) {
    const plannedMeals = await dbContext.PlannedMeal.find({ dayId }).populate('day recipe')
    // return {
    //   dayId: dayId,
    //   plannedMeals: plannedMeals
    // }
    return plannedMeals
    // FIXME return an object with day id as the key and the array as the value, SAVING THIS WILL BREAK EVERYTHING
  }

  async removePlannedMealsByDay(daysArray) {
    for (let i = 0; i < daysArray.length; i++) {
      await dbContext.PlannedMeal.deleteMany({ dayId: daysArray[i]._id }).populate('day')
    }
  }
  async removePlannedMealsByRecipe(recipeId) {
    await dbContext.PlannedMeal.deleteMany({ recipeId }).populate("recipe")
    return `Deleted all planned meals with recipe`
  }

  async removePlannedMeal(plannedMealId) {
    const foundPlannedMeal = await dbContext.PlannedMeal.findById(plannedMealId)
    if (!foundPlannedMeal) throw new BadRequest('No planned meal at this id')
    await foundPlannedMeal.remove()

    return `This planned meal has been deleted`
  }
}

export const plannedMealsService = new PlannedMealsService()