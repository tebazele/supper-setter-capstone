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

// TODO remove recipe. Deleting recipes should also go through every day  and remove plannedmeals tied to day ( delete every planned meal of account where recipe id [I dont know how we are going to do this(?)] = deleted recipe id  ) I dont think this is going to work unless we have universally labeled recipe ids. else it will be a pain in the ass to go by every single item and search the name etc. therefore