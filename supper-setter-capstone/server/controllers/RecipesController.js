import { Auth0Provider } from "@bcwdev/auth0provider";
import { recipesService } from "../services/RecipesService";
import BaseController from "../utils/BaseController";


export class RecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      // .get('/:id', this.getOneRecipe)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addToMyRecipes)
  }

  async addToMyRecipes(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const newRecipe = await recipesService.addToMyRecipes(req.body)
      return res.send(newRecipe)
    } catch (error) {
      next(error)
    }
  }



  // async getOneRecipe(req, res, next) {
  //   try {
  //     const recipe = await recipesService.getOneRecipe(req.params.url)
  //     return res.send(recipe)
  //   } catch (error) {
  //     next(error)
  //   }
  // }


}