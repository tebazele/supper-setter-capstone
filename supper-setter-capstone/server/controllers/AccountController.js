import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { mealPlansService } from "../services/MealPlansService"
import { recipesService } from "../services/RecipesService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/mealplans', this.getAccountMealPlans)
      .get('/recipes', this.getAccountRecipes)
      .put('', this.updateAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async updateAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountMealPlans(req, res, next) {
    try {
      const mealPlan = await mealPlansService.getAccountMealPlans(req.userInfo.id)
      return res.send(mealPlan)
    } catch (error) {
      next(error)
    }
  }


  async getAccountRecipes(req, res, next) {
    try {
      const recipes = await recipesService.getAccountRecipes(req.userInfo.id)
      return res.send(recipes)
    } catch (error) {
      next(error)
    }
  }





}
