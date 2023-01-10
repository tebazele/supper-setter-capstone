import { AppState } from "../AppState.js"
import { Recipe } from "../models/Recipe.js"
import { logger } from "../utils/Logger.js"
import { api, edamamApi } from "./AxiosService.js"

class RecipesService {

  async getRecipes(query) {
    const res = await edamamApi.get('', { params: { q: query } })
    // logger.log(res.data.hits)
    logger.log(res.data)

    AppState.nextPageUrl = res.data._links.next.href
    AppState.recipes = res.data.hits.map(r => new Recipe(r))
  }

  async getRecipeById(id) {
    const res = await edamamApi.get('/' + id)
    logger.log('this is getting recipe by id', res.data)
    let mappedRecipe = new Recipe(res.data)
    logger.log(mappedRecipe)
    AppState.activeRecipe = mappedRecipe
  }

  async addToMyRecipes(recipeId) {
    let foundRecipe = await AppState.recipes.find(r => r.edamamId == recipeId)
    if (!foundRecipe) {
      logger.log('no recipe at this id')
    }
    const res = await api.post('/api/recipes', foundRecipe)
    // logger.log(res.data)
    AppState.myRecipes.push(res.data)
    return res.data
  }

  async getMyRecipes() {
    try {
      const res = await api.get('account/recipes')
      logger.log('got my recipes', res.data)
      AppState.myRecipes = res.data
    } catch (error) {
      logger.log(error.message)
    }
  }

  async loadMoreRecipes() {
    const res = await edamamApi.get(AppState.nextPageUrl)
    logger.log(res.data)
    const mappedRecipes = res.data.hits.map(r => new Recipe(r))
    AppState.recipes.push(...mappedRecipes)
    AppState.nextPageUrl = res.data._links.next.href
  }


}

export const recipesService = new RecipesService()