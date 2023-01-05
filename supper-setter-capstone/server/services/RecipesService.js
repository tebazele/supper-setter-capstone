import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


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




}




export const recipesService = new RecipesService()