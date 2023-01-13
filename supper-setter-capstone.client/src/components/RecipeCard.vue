<template>
  <router-link :to="{ name: 'RecipeDetails', params: { edamamId: recipe.edamamId } }">
    <div class="component p-3 border border-dark rounded border-1 m-2 bg-white raleway fw-bold card-height">
      <div class="standard-height">
        <h4 class="text-black">{{ recipe.label }}</h4>

      </div>

      <div class="text-center">

        <img :src="recipe.image" alt="meal" class="img-fluid cardImg my-2" :title="recipe.label" />
      </div>

      <div class="d-flex justify-content-between">
        <span v-if="recipe.cookTime" class="mdi mdi-clock">{{ recipe.cookTime }} mins</span>
        <p>{{ Math.round(recipe.calories) }} Calories</p>
        <div class="div d-flex justify-content-end">
          <p> {{ recipe.yield }} Servings</p>
        </div>
      </div>
      <!-- FOR EACH DIET TAG?? YUP-->
      <div class="d-flex  ">

        <div class="" v-for="d in dietLabels" :key="d">
          <div class=" p-1">
            <span class="bg-danger text-white rounded p-2">{{ d }}</span>
          </div>
        </div>




        <!-- <h5 class="bg-danger text-white rounded">Low-Carb</h5>
      <h5 class="bg-danger text-white rounded">Low-Carb</h5> -->
      </div>

    </div>
  </router-link>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Recipe } from '../models/Recipe.js';
import { logger } from "../utils/Logger";
export default {
  props: {
    recipe: { type: Recipe, required: true }
  },
  setup(props) {





    return {
      dietLabels: computed(() => props.recipe.dietLabels),


    }
  }
};
</script>


<style lang="scss" scoped>
.cardImg {
  object-fit: cover;
  max-height: 30vh;
  width: 70vh
}

.card-height {
  min-height: 445px;
}

.standard-height {
  min-height: 75px;
}
</style>