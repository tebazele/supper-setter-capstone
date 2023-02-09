import { dbContext } from "../db/DbContext.js"

class ShoppingListService {
  async getDayShopList(dayId) {
    const shoppingList = await dbContext.Ingredient.find({ dayId })
    return shoppingList
  }


  async generateDayShopList(dayId, body) {
    const shoppingList = []
    await body.forEach(i => {
      i.dayId = dayId;
      dbContext.Ingredient.create(i)
    })
    return `Shopping list for dayId ${dayId} generated`
  }



}



export const shoppingListService = new ShoppingListService()