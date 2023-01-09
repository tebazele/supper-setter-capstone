import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


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
    if (recipe.accountId != accountId) {
      throw new Forbidden(`you do not have permission to edit this recipe`)
    }

    recipe.archived = !recipe.archived

    await recipe.save()
    return `recipe has been archived`
  }


}




export const recipesService = new RecipesService()