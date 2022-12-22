import { Auth0Provider } from "@bcwdev/auth0provider";
import { mealPlansService } from "../services/MealPlansService";
import BaseController from "../utils/BaseController";



export class MealPlansController extends BaseController {
  constructor() {
    super('api/mealplans')
    this.router
      .get('')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMealPlan)

  }

  async createMealPlan(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newMealPlan = await mealPlansService.createMealPlan(req.body)
      return res.send(newMealPlan)
    } catch (error) {
      next(error)
    }
  }



}