import { Auth0Provider } from "@bcwdev/auth0provider";
import { shoppingCartService } from "../services/ShoppingListService.js";
import BaseController from "../utils/BaseController.js";

export class ShoppingCartController extends BaseController {
  constructor() {
    super('api/shoppingcarts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.saveShoppingList)
  }



  async saveShoppingList(req, res, next) {
    try {

      const message = await shoppingCartService.saveShoppingList(req.body)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }








}