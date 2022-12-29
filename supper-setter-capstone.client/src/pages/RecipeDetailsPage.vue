<template>
  <div v-if="recipe" class="container-fluid">
    <section class="row">
      <div class="col-12 text-center">
        <h1>{{ recipe.recipe.label }}</h1>
      </div>
    </section>
    <section class="row">
      <img :src="recipe.recipe.image" alt="" class="img-fluid">
    </section>
    <section v-if="ingredients" class="row">
      <h3 class="mt-2">ingredients</h3>
      <div v-for="i in ingredients" class="col-12">
        {{ i.text }}
      </div>
      <h3 class="mt-2 mb-0">Cooking Instructions</h3>
      <a class="" :href="recipe.recipe.url">Click here for instructions</a>
    </section>
    <div class="text-end sticky-bottom">
      <button class="btn btn-success ">Add Recipe</button>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { recipesService } from "../services/RecipesService";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      getRecipeById()
    })

    async function getRecipeById() {
      try {
        await recipesService.getRecipeById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }







    return {
      recipe: computed(() => AppState.activeRecipe),
      ingredients: computed(() => AppState.activeRecipe.recipe.ingredients)

    }


  }
};
</script>


<style lang="scss" scoped>

</style>