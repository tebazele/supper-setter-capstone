<template>
  <div class="container-fluid">
    <div class="text-end">
      <button class="btn btn-success" @click="createDay">Create Day</button>
    </div>
    <div v-if="mealPlan">
      <h2>
        {{ mealPlan.name }}

      </h2>
    </div>
    <section class="row">
      <!-- <p>{{ plannedMealsByDay }}</p> -->
      <div class="col-12" v-for="(ps, index) in plannedMealsByDay" :key="index">
        <h5>Day {{ index + 1 }}</h5>
        <MealPlan :plannedMealsArray="ps" />
      </div>
    </section>
    <!-- <div v-for="d in days" :key="d.id">
      <p>Breakfast</p>
      <ul v-for="(b, index) in d.breakfastRecipes" :key="index">
        <li>{{ b }}</li>
      </ul>
      <ul>
        <li>Add a breakfast recipe</li>
      </ul>
      <p>Lunch</p>
      <ul v-for="(l, index) in d.lunchRecipes" :key="index">
        <li>{{ l }}</li>
      </ul>
      <ul>
        <li>Add a lunch recipe</li>
      </ul>
      <p>Dinner</p>
      <ul v-for="(s, index) in d.dinnerRecipes" :key="index">
        <li>{{ s }}</li>
      </ul>
      <ul>
        <li>Add a dinner recipe</li>
      </ul>
    </div> -->

  </div>


</template>


<script>
import { logger } from '../utils/Logger.js';
import { daysService } from '../services/DaysService.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { mealPlansService } from '../services/MealPlansService.js';
import { plannedMealsService } from '../services/PlannedMealsService.js';
import MealPlan from '../components/MealPlan.vue';
export default {
  setup() {
    watchEffect(() => {
      if (AppState.activeDays) {
        getPlannedMeals(AppState.activeDays);
      }
    });
    onMounted(() => {
      getDays();
      getMealPlanById();
    });
    const route = useRoute();
    async function getPlannedMeals(daysArray) {
      try {
        await plannedMealsService.getPlannedMeals(daysArray);
      }
      catch (error) {
        Pop.error(error.message);
        logger.log(error);
      }
    }
    async function getDays() {
      try {
        await daysService.getDays(route.params.mealPlanId);
      }
      catch (error) {
        Pop.error(error.message);
        logger.log(error);
      }
    }
    async function getMealPlanById() {
      try {
        await mealPlansService.getMealPlanById(route.params.mealPlanId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    return {
      mealPlan: computed(() => AppState.activeMealPlan),
      days: computed(() => AppState.activeDays),
      plannedMealsByDay: computed(() => AppState.plannedMeals),
      async createDay() {
        try {
          await daysService.createDay(route.params.mealPlanId);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { MealPlan }
};
</script>


<style lang="scss" scoped>

</style>