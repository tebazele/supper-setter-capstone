<template>
  <div class="container serif-pro">
    <section class="row justify-content-between">
      <div class="col-6">
        <h4 class="mt-3 raleway">My Meal Plans</h4>
      </div>
      <div class="col-6 text-end">
        <router-link :to="{ name: 'MealPlans' }">
          <button class="btn btn-success my-3">Add MealPlan</button>

          <!-- @click="clearPlannedMeals()" -->

        </router-link>
      </div>
    </section>
    <section class="row">
      <div v-for="m in mealPlans" :key="m.id" class="col-12 d-flex align-items-baseline justify-content-between">
        <button @click="this.goToMealPlan(m.id)" class="btn btn-outline-dark bg-primary rounded-pill m-1 same-width">{{
          m.name
        }}</button>
        <h6>Created: {{ new Date(m.createdAt).toLocaleDateString() }}</h6>

        <!-- <router-link :to="{ name: 'MealPlanDetails', params: { mealPlanId: m.id } }">
          <h6 class="selectable">{{ m.name }}</h6>

        </router-link> -->
      </div>
    </section>
    <hr>
    <section class="row">
      <div class="col-12">
        <h4 class="my-1 raleway">My Recipes</h4>
      </div>
      <div v-for="r in nonArchivedRecipes" :key="r.edamamId" class="col-12">
        <router-link :to="{ name: 'RecipeDetails', params: { edamamId: r.edamamId } }">
          <div class="pb-1 text-center bg-white my-2">

            <img :src="r.image" class="recipe-img" alt="">
            <h6 class="roboto-slab pt-2">{{ r.label }}</h6>

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
      nonArchivedRecipes: computed(() => AppState.myRecipes.filter(r => r.archived == false)),
      mealPlans: computed(() => AppState.mealPlans),

      async goToMealPlan(mealPlanId) {
        // logger.log(mealPlanId)
        await daysService.getDays(mealPlanId)
        // logger.log(AppState.activeDays)

        await plannedMealsService.getPlannedMeals(AppState.activeDays)
        // logger.log(AppState.plannedMeals);

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
/* img {
  max-width: 100px;
} */

.same-width {
  width: 300px;
}

.recipe-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  object-position: center;
}
</style>
