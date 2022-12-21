export class Recipe {
    constructor(data) {
        this.image = data.recipe.image
        this.title = data.recipe.label
        this.dietLabels = data.recipe.dietLabels
        // diet labels is an array


    }
}