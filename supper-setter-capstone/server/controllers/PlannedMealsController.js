import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { plannedMealsService } from "../services/PlannedMealsService.js";
export class PlannedMealsController extends BaseController {
  constructor() {
    super('api/plannedmeals')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPlannedMeal)
      .delete('/:plannedMealId', this.removePlannedMeal)
  }

  async createPlannedMeal(req, res, next) {
    try {
      const newPlannedMeal = await plannedMealsService.createPlannedMeal(req.body)
      return res.send(newPlannedMeal)
    } catch (error) {
      next(error)
    }
  }

  async removePlannedMeal(req, res, next) {
    try {
      const message = await plannedMealsService.removePlannedMeal(req.params.plannedMealId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

}