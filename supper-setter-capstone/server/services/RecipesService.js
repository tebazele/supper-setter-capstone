import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class RecipesService {

  async getAccountRecipes(accountId) {
    const recipes = await dbContext.MyRecipe.find({ accountId })
    if (!recipes) {
      throw new BadRequest(`no recipes at ${accountId}`)
    }
    return recipes
  }

  async addToMyRecipes(body) {
    const newRecipe = await dbContext.MyRecipe.create(body)
    await newRecipe.populate('account')
    return newRecipe
  }

  async getOneRecipe(id) {
    const recipe = await dbContext.MyRecipe.findById(id)
    if (!recipe) {
      throw new BadRequest(`no recipe with id of ${id}`)
    }
    return recipe
  }




}




export const recipesService = new RecipesService()