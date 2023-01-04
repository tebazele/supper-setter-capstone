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
    <div v-for="d in days" :key="d.id">
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
    </div>

  </div>


</template>


<script>
import { logger } from '../utils/Logger.js';
import { daysService } from '../services/DaysService.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { mealPlansService } from '../services/MealPlansService.js';
export default {
  setup() {
    onMounted(() => {
      getDays()
      getMealPlanById()
    })
    const route = useRoute();

    async function getDays() {
      try {
        await daysService.getDays(route.params.mealPlanId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }

    }

    async function getMealPlanById() {
      try {
        await mealPlansService.getMealPlanById(route.params.mealPlanId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }



    return {
      mealPlan: computed(() => AppState.activeMealPlan),
      days: computed(() => AppState.activeDays),

      async createDay() {
        try {
          await daysService.createDay(route.params.mealPlanId)

        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }






    }
  }
};
</script>


<style lang="scss" scoped>

</style>