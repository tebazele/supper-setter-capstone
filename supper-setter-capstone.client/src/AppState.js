import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Recipe.js').Recipe[]} */
  recipes: [],

  queryOptions: ['vegan', 'chicken', 'international', 'dessert', 'sandwich', 'breakfast', 'lunch', 'dinner', 'vegetable', 'smoothie', 'vegetarian', 'pizza', 'apple', 'pineapple', 'lamb', 'cream', 'marinated', 'high-protein', 'soup', 'pasta', 'cocktail', 'healthy', 'delicious', 'rich', 'savory', 'sweet'],

  myRecipes: [],

  activeRecipe: null,

  mealPlans: [],

  activeMealPlan: null,

  activeDays: [],

  activeDay: null,

  plannedMeals: [],

  activePlannedMealRequestBody: null,

  nextPageUrl: null,

  shoppingList: null,
})
