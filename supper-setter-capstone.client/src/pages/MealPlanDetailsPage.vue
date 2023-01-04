<template>
  <div class="component">
    <div class="text-end">
      <button class="btn btn-success">Create Day</button>
    </div>
    <div v-if="mealPlan">
      {{ mealPlan }}
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
export default {
  setup() {
    onMounted(() => {
      getDays()
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