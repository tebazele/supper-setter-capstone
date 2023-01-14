import { dbContext } from "../db/DbContext.js"

class ShoppingCartService {
  async saveShoppingList(body) {
    if (body.dayId) {
      let oldlist = await this.checkForShoppingListByDayId(body.dayId)
      if (oldlist) {
        return oldlist
      }
    }
    const newShoppingList = await dbContext.ShoppingList.create(body)
    return newShoppingList
  }

  async checkForShoppingListByDayId(dayId) {
    const shoppinglist = await dbContext.ShoppingList.findOne({ dayId })
    return shoppinglist
  }
}



export const shoppingCartService = new ShoppingCartService()