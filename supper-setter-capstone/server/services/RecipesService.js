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




}




export const recipesService = new RecipesService()