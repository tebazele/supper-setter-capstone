<template>
  <div v-if="recipe" class="container-fluid serif-pro">
    <section class="row">
      <div class="col-12 text-center">
        <h1>{{ recipe.label }}</h1>
      </div>
    </section>
    <section class="row">
      <img :src="recipe.image" alt="" class="img-fluid">
    </section>
    <section v-if="ingredients" class="row">
      <h3 class="mt-2">ingredients</h3>
      <!-- STUB ignore this -->
      <div v-for="(i, index) in ingredients" :key="index" class="col-12">
        {{ i.text }}
      </div>
      <h3 class="mt-2 mb-0">Cooking Instructions</h3>
      <a class="" :href="recipe.uniqueUrl">Click here for instructions</a>
    </section>
    <div class="text-end sticky-bottom">
      <button v-if="!myRecipes.find(r => r.edamamId == recipe.edamamId)" @click="addToMyRecipes" class="btn btn-success"
        title="Add this recipe to your recipe collection!">Add
        Recipe</button>
      <button v-else class="btn btn-danger" title="Remove this recipe from your recipe collection">Remove
        Recipe</button>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import Pop from "../utils/Pop";
import { recipesService } from "../services/RecipesService";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import { accountService } from '../services/AccountService.js';
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      getRecipeById()
      // getMyRecipes()
    })
    // FIXME don't need this  -- is in auth service
    watchEffect(() => {
      if (AppState.account.id) {
        getMyRecipes()
      }
    })

    async function getRecipeById() {
      try {
        await recipesService.getRecipeById(route.params.edamamId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getMyRecipes() {
      try {
        await recipesService.getMyRecipes()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }







    return {
      recipe: computed(() => AppState.activeRecipe),
      ingredients: computed(() => AppState.activeRecipe.ingredients),
      myRecipes: computed(() => AppState.myRecipes),

      async addToMyRecipes() {
        try {
          // logger.log(route.params.edamamId)
          await recipesService.addToMyRecipes(route.params.edamamId)
          Pop.toast('Recipe added to your recipes!')
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      }

    }


  }
};
</script>


<style lang="scss" scoped>

</style>