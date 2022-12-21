import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { mealPlansService } from "../services/MealPlansService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('account/mealplans', this.getAccountMealPlans)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  // async getAccountMealPlans(req, res, next) {
  //   try {
  //     const mealPlan = await mealPlansService.getAccountMealPlans(req.userInfo.id)
  //     return res.send(mealPlan)
  //   } catch (error) {
  //     next(error)
  //   }
  // }


}
