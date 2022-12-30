import { AppState } from "../AppState.js"
import { Recipe } from "../models/Recipe.js"
import { logger } from "../utils/Logger.js"
import { api, edamamApi } from "./AxiosService.js"

class RecipesService {

    async getFeaturedRecipes(query) {
        const res = await edamamApi.get('', { params: { q: query } })
        logger.log(res.data.hits)
        AppState.recipes = res.data.hits.map(r => new Recipe(r))
    }

    async getRecipeById(id) {
        const res = await edamamApi.get('/' + id)
        // logger.log('this is getting recipe by id', res.data)
        AppState.activeRecipe = res.data
    }

    async addToMyRecipes(recipeId) {
        let foundRecipe = await AppState.recipes.find(r => r.edamamId == recipeId)
        if (!foundRecipe) {
            logger.log('no recipe at this id')
        }
        const res = await api.post('/api/recipes', foundRecipe)
        // logger.log(res.data)
        return res.data
    }


}

export const recipesService = new RecipesService()