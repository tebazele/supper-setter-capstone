import { Auth0Provider } from "@bcwdev/auth0provider";
import { daysService } from "../services/DaysService";
import { plannedMealsService } from "../services/PlannedMealsService.js";
import BaseController from "../utils/BaseController";



export class DaysController extends BaseController {
  constructor() {
    super('api/days')
    this.router
      .get('/:dayId/plannedmeals', this.getPlannedMealsByDayId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createDay)
      .delete('/:dayId', this.removeDay)

  }

  async getPlannedMealsByDayId(req, res, next) {
    try {
      const plannedMeals = await plannedMealsService.getPlannedMealsByDayId(req.params.dayId)
      res.send(plannedMeals)
    } catch (error) {
      next(error)
    }
  }
  async createDay(req, res, next) {
    try {
      const day = await daysService.createDay(req.body)
      return res.send(day)
    } catch (error) {
      next(error)
    }
  }
  async removeDay(req, res, next) {
    try {
      const message = await daysService.removeDay(req.params.dayId, req.userInfo.id)
    } catch (error) {
      next(error)
    }
  }

}