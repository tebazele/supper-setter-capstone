import { dbContext } from "../db/DbContext.js"

class ShoppingListService {
  async saveShoppingList(body) {
    // if (body.dayId) {
    //   let oldlist = await this.checkForShoppingListByDayId
    //   if (oldlist) {
    //     return oldlist
    //   }
    // }
    const newShoppingList = await dbContext.ShoppingList.create(body)
    return newShoppingList
  }

  async checkForShoppingListByDayId(dayId) {
    const shoppinglist = await dbContext.ShoppingList.find({ dayId })

    return shoppinglist
  }
}



export const shoppingListService = new ShoppingListService()