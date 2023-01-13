import { logger } from "../utils/Logger"
import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { plannedMealsService } from "./PlannedMealsService.js"


class RecipesService {

  async getAccountRecipes(accountId) {
    const myRecipes = await dbContext.Recipe.find({ accountId })
    if (!myRecipes) {
      throw new BadRequest(`no recipes at ${accountId}`)
    }
    return myRecipes
  }

  async addToMyRecipes(body) {
    const newRecipe = await dbContext.Recipe.create(body)
    await newRecipe.populate('account')
    return newRecipe
  }

  async getOneRecipe(id) {
    const recipe = await dbContext.Recipe.findById(id)
    if (!recipe) {
      throw new BadRequest(`no recipe with id of ${id}`)
    }
    return recipe
  }

  async archiveRecipe(recipeId, accountId) {
    const recipe = await dbContext.Recipe.findById(recipeId).populate('account')
    if (!recipe) {
      throw new BadRequest(`no recipe with id of ${recipeId}`)
    }
    // @ts-ignore
    if (recipe.accountId.toString() != accountId) {
      throw new Forbidden(`you do not have permission to edit this recipe`)
    }

    recipe.archived = !recipe.archived

    await recipe.save()
    return recipe
  }

  async clearRecipe(recipeId, accountId) {
    const recipe = await dbContext.Recipe.findById(recipeId).populate('account')
    if (!recipe) {
      throw new BadRequest(`no recipe with id of ${recipeId}`)
    }
    // @ts-ignore
    if (recipe.accountId.toString() != accountId) {
      throw new Forbidden(`you do not have permission to clear this recipe`)
    }

    await plannedMealsService.removePlannedMealsByRecipe(recipeId)

    await recipe.remove()

    return `${recipe.label} has been removed from collection and all instances in meal plans have been removed`
  }


  async checkIngredient(recipeId, ingredientId) {
    const recipe = await this.getOneRecipe(recipeId)
    const ingredient = recipe.ingredients.filter(i => i.foodId == ingredientId)
    return ingredient
  }

}




export const recipesService = new RecipesService()