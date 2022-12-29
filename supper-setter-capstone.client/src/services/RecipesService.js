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



}

export const recipesService = new RecipesService()