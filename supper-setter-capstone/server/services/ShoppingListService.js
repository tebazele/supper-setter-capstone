import { dbContext } from "../db/DbContext.js"

class ShoppingCartService {
  async saveShoppingList(body) {
    const newShoppingList = await dbContext.ShoppingList.create(body)
    return newShoppingList
  }


}

export const shoppingCartService = new ShoppingCartService()