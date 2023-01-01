<template>
  <div class="container">
    <section class="row justify-content-between">
      <div class="col-8">
        <h2>My Meal Plans</h2>
      </div>
      <div class="col-4 text-end">
        <router-link :to="{ name: 'MealPlans' }">
          <button class="btn btn-success">Add MP</button>

        </router-link>
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <MealPlan />
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <h2>My Recipes</h2>
      </div>
      <div v-for="r in myRecipes" :key="r.edamamId" class="col-12">
        <router-link :to="{ name: 'RecipeDetails', params: { edamamId: r.edamamId } }">
          <div class="card">
            <h5>{{ r.label }}</h5>
            <img :src="r.image" alt="">

          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import MealPlan from "../components/MealPlan.vue";
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      myRecipes: computed(() => AppState.myRecipes)
    };
  },
  components: { MealPlan }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
