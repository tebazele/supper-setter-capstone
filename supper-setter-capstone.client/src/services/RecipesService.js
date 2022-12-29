import { AppState } from "../AppState.js"
import { Recipe } from "../models/Recipe.js"
import { logger } from "../utils/Logger.js"
import { edamamApi } from "./AxiosService.js"

class RecipesService {

    async getFeaturedRecipes(query) {
        const res = await edamamApi.get('', { params: { q: query } })
        logger.log(res.data.hits)
        AppState.recipes = res.data.hits.map(r => new Recipe(r))
    }

    async getRecipeById(id) {
        debugger
        const res = await edamamApi.get('/' + id)
        logger.log('this is getting recipe by id', res.data)
        AppState.activeRecipe = res.data
    }


}

export const recipesService = new RecipesService()