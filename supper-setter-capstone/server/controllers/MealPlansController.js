import { Auth0Provider } from "@bcwdev/auth0provider";
import { daysService } from "../services/DaysService";
import { mealPlansService } from "../services/MealPlansService";
import BaseController from "../utils/BaseController";



export class MealPlansController extends BaseController {
  constructor() {
    super('api/mealplans')
    this.router
      .get('/:mealPlanId', this.getOneMealPlan)
      .get('/:mealPlanId/days', this.getMealPlanDays)
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

  async getOneMealPlan(req, res, next) {
    try {
      const mealPlan = await mealPlansService.getOneMealPlan(req.params.mealPlanId)
      return res.send(mealPlan)
    } catch (error) {
      next(error)
    }
  }


  async getMealPlanDays(req, res, next) {
    try {
      const days = await daysService.getMealPlanDays(req.params.mealPlanId)
      return res.send(days)
    } catch (error) {
      next(error)
    }
  }


}