<template>
  <div class="component p-3 border border-dark rounded border-1 m-2 bg-white">


    <img :src="recipe.image" alt="meal" class="img-fluid cardImg my-2" :title="recipe.label">
    <h4>{{ recipe.label }}</h4>
    <div class="d-flex justify-content-between">
      <i class="mdi mdi-clock">{{ recipe.cookTime }}</i>
      <p>{{ Math.round(recipe.calories) }} Calories</p>
    </div>
    <!-- FOR EACH DIET TAG?? YUP-->
    <div class="d-flex justify-content-evenly" v-for="d in dietLabels" :key="d">
      <h5 class="bg-danger text-white rounded">{{ d }}</h5>
      <!-- <h5 class="bg-danger text-white rounded">Low-Carb</h5>
      <h5 class="bg-danger text-white rounded">Low-Carb</h5> -->
    </div>
    <div class="div d-flex justify-content-end">
      <p>Serves {{ recipe.yield }}</p>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Recipe } from '../models/Recipe.js';
export default {
  props: {
    recipe: { type: Recipe, required: true }
  },
  setup(props) {
    return {
      dietLabels: computed(() => props.recipe.dietLabels)
    }
  }
};
</script>


<style lang="scss" scoped>
.cardImg {
  object-fit: cover;
  height: 20vh;
  width: 45vh
}
</style>