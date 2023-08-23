import { Auth0Provider } from "@bcwdev/auth0provider";
import { daysService } from "../services/DaysService";
import { mealPlansService } from "../services/MealPlansService";
import { shoppingListService } from "../services/ShoppingListService.js";
import BaseController from "../utils/BaseController";



export class MealPlansController extends BaseController {
  constructor() {
    super('api/mealplans')
    this.router
      .get('/:mealPlanId', this.getOneMealPlan)
      .get('/:mealPlanId/days', this.getMealPlanDays)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:mealPlanId/shoppinglist', this.getShopList)
      .put('/:mealPlanId/shoppinglist/:ingredientId', this.updateIngredient)
      .post('/:mealPlanId/shoppinglist', this.generateShopList)
      .post('', this.createMealPlan)
      .delete('/:mealPlanId', this.removeMealPlan)

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
  async removeMealPlan(req, res, next) {
    try {
      const message = await mealPlansService.removeMealPlan(req.params.mealPlanId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async generateShopList(req, res, next) {
    try {
      await mealPlansService.checkIfShopList(req.params.mealPlanId)
      const message = await shoppingListService.generateMealPlanShopList(req.params.mealPlanId, req.body)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getShopList(req, res, next) {
    try {
      const shoppinglist = await shoppingListService.getMealPlanShopList(req.params.mealPlanId)
      return res.send(shoppinglist)
    } catch (error) {
      next(error)
    }
  }

  async updateIngredient(req, res, next) {
    try {
      const ingredient = await shoppingListService.updateIngredient(req.params.ingredientId)
      return res.send(ingredient)
    } catch (error) {
      next(error)
    }
  }
}