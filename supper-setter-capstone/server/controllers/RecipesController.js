import { recipesService } from "../services/RecipesService";
import BaseController from "../utils/BaseController";


export class RecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .get('/:uniqueURL', this.getOneRecipe)
  }



  async getOneRecipe(req, res, next) {
    try {
      const recipe = await recipesService.getOneRecipe(req.params.url)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }


}