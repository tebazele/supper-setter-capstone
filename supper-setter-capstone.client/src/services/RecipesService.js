import { logger } from "../utils/Logger.js"
import { edamamApi } from "./AxiosService.js"

class RecipesService {

    async getFeaturedRecipes(query) {
        await edamamApi.get({ params: { q: query } })
        logger.log(res.data.hits)
    }

}

export const recipesService = new RecipesService()