export class Recipe {
    constructor(data) {
        this.image = data.recipe.image
        this.label = data.recipe.label
        this.dietLabels = data.recipe.dietLabels
        this.healthLabels = data.recipe.healthLabels
        // diet labels & health labels are arrays
        this.ingredientLines = data.recipe.ingredientLines
        // ingredientLines is an array of strings
        this.ingredients = data.recipe.ingredients
        // array of objects -- we care about ingredients[i].food
        this.calories = data.recipe.calories
        this.glycemicIndex = data.recipe.glycemicIndex
        this.mealType = data.recipe.mealType
        this.instructions = data.recipe.instructions
        this.yield = data.recipe.yield
        this.totalNutrients = data.recipe.totalNutrients
        this.cookTime = data.recipe.totalTime
        this.cuisineType = data.recipe.cuisineType
        this.uniqueUrl = data.recipe.url
        this.edamamId = this.parseId(data._links.self.href)

    }

    parseId(routeString) {
        let id = routeString.replace('https://api.edamam.com/api/recipes/v2/', '')
        id = id.replace('?type=public&app_id=54586086&app_key=d8b752a4da7fffc862014e3c3524d868', '')
        return id
    }
}