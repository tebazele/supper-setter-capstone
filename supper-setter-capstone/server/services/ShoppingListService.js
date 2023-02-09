import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class ShoppingListService {
  async updateIngredient(id) {
    const ingredient = await dbContext.Ingredient.findById(id)
    if (!ingredient) { throw new BadRequest(`There is no ingredient with the ID of ${id}`) }
    ingredient.checked = !ingredient.checked
    ingredient.save()
  }
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