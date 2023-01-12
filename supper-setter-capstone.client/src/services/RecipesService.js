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

  async addToMyRecipes(edamamId) {
    const foundRecipe = AppState.myRecipes.find(r => r.edamamId == edamamId)
    if (foundRecipe) {
      // const foundRecipe = AppState.myRecipes.find(r => r.edamamId = edamamId)
      // logger.log(foundRecipe)

      foundRecipe.archived = !foundRecipe.archived
      // logger.log(foundRecipe)
      const editedRecipe = await api.put('api/recipes/' + foundRecipe.id, foundRecipe)
      return editedRecipe

    } else {
      let foundRecipe = await AppState.recipes.find(r => r.edamamId == edamamId)
      if (!foundRecipe) {
        logger.log('no recipe at this id')
      }
      const res = await api.post('/api/recipes', foundRecipe)
      // logger.log(res.data)
      AppState.myRecipes.push(res.data)
      return res.data



    }
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

  async archiveRecipe(edamamId) {
    const foundRecipe = AppState.myRecipes.find(r => r.edamamId == edamamId)
    logger.log(foundRecipe)
    const index = AppState.myRecipes.findIndex(r => r.id == foundRecipe.id)
    logger.log(index)
    foundRecipe.archived = true
    const res = await api.put('api/recipes/' + foundRecipe.id, foundRecipe)
    logger.log(res.data)
    AppState.myRecipes.splice(index, 1, res.data)
  }


}

export const recipesService = new RecipesService()