import { dbContext } from "../db/DbContext.js"


class PlannedMealsService {
  async createPlannedMeal(body) {
    const newPlannedMeal = await dbContext.PlannedMeal.create(body)
    await newPlannedMeal.populate('day recipe')
    return newPlannedMeal
  }

  async getPlannedMealsByDayId(dayId) {
    const plannedMeals = await dbContext.PlannedMeal.find({ dayId }).populate('day recipe')
    return plannedMeals
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
}

export const plannedMealsService = new PlannedMealsService()