

class IngredientsService {

  async checkIngredientByRecipeId(ingredientId, recipeId) {
    const checked = await api.put(`api/recipes/:recipeId/:ingredientId`)
  }
}