import { Auth0Provider } from "@bcwdev/auth0provider";
import { shoppingListService } from "../services/ShoppingListService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";

export class ShoppingListController extends BaseController {
  constructor() {
    super('api/shoppinglist')
    this.router
      .post('', this.saveShoppingList)
      // .get('/:dayId', this.grabShoppingListByDayId)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  // async grabShoppingListByDayId(req, res, next) {
  //   try {
  //     const cart = await shoppingListService.grabShoppingListByDayId(req.params.dayId)
  //     return res.send(cart)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  async saveShoppingList(req, res, next) {
    try {
      const message = await shoppingListService.saveShoppingList(req.body)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }








}