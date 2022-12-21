export class Recipe {
    constructor(data) {
        this.image = data.recipe.image
        this.title = data.recipe.label
        this.dietLabels = data.recipe.dietLabels
        // diet labels is an array
        this.ingredientLines = data.recipe.ingredientLines
        // ingredientLines is an array of strings
        this.ingredients = data.recipe.ingredients
        // array of objects -- we care about ingredients[i].food

    }
}