import { recipesService } from "../services/RecipesService";
import BaseController from "../utils/BaseController";


export class RecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .get('/:id', this.getOneRecipe)
  }



  async getOneRecipe(req, res, next) {
    try {
      const recipe = await recipesService.getOneRecipe(req.params.id)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }


}