<template>
  <div class="component">
    <div v-if="mealPlan">
      {{ mealPlan }}
    </div>
  </div>
</template>


<script>
import { daysService } from '../services/DaysService.js'
import { logger } from '../utils/Logger.js';
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
      mealPlan: computed(() => AppState.activeMealPlan)
    }
  }
};
</script>


<style lang="scss" scoped>

</style>