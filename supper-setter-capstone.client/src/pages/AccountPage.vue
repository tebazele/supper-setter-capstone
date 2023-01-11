<template>
  <div class="container">
    <section class="row justify-content-between">
      <div class="col-8">
        <h2>My Meal Plans</h2>
      </div>
      <div class="col-4 text-end">
        <router-link :to="{ name: 'MealPlans' }">
          <button class="btn btn-success">Add MP</button>

          <!-- @click="clearPlannedMeals()" -->

        </router-link>
      </div>
    </section>
    <section class="row">
      <div v-for="m in mealPlans" :key="m.id" class="col-12">
        <button @click="this.goToMealPlan(m.id)" class="btn btn-outline-dark rounded-pill m-1">{{ m.name }}</button>

        <!-- <router-link :to="{ name: 'MealPlanDetails', params: { mealPlanId: m.id } }">
          <h6 class="selectable">{{ m.name }}</h6>

        </router-link> -->
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
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import MealPlan from "../components/MealPlan.vue";
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { mealPlansService } from '../services/MealPlansService.js';
import { daysService } from '../services/DaysService.js';
import { plannedMealsService } from '../services/PlannedMealsService.js';
import { router } from '../router.js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter()
    onMounted(() => {
      getMyMealPlans()
    })

    async function getMyMealPlans() {
      try {
        await mealPlansService.getMyMealPlans()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }



    }
    return {
      account: computed(() => AppState.account),
      myRecipes: computed(() => AppState.myRecipes),
      mealPlans: computed(() => AppState.mealPlans),

      async goToMealPlan(mealPlanId) {
        logger.log(mealPlanId)
        await daysService.getDays(mealPlanId)
        logger.log(AppState.activeDays)

        await plannedMealsService.getPlannedMeals(AppState.activeDays)
        logger.log(AppState.plannedMeals);

        router.push({ name: 'MealPlanDetails', params: { mealPlanId: mealPlanId } })
      },

      // async clearPlannedMeals() {
      //   // AppState.plannedMeals = null
      //   router.push({ name: 'MealPlans' })
      // }



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
