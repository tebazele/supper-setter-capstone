<template>
  <div>
    <h2><span v-if="route.query.day">{{ day.name }} of {{ day.mealPlan.name }}</span> shopping list </h2>

    <div v-for="i in ingredients" class="d-flex ">

      <div class="form-check ms-2">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">

        </label>
      </div>

      <p>{{ i.food }}
        <span v-if="i.quantity != 0">

          {{ i.quantity }}
        </span>
        <span v-if="i.measure != '<unit>'">
          {{ i.measure }}
        </span>
      </p>


    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import { shoppingListService } from "../services/ShoppingListService.js";
import Pop from "../utils/Pop.js";
import { daysService } from "../services/DaysService.js";
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      loadShoppingList()
    })

    async function loadShoppingList() {
      if (route.query.day) {
        await shoppingListService.getShoppingListByDayId(route.query.day)
        await daysService.getDayInfoByDayId(route.query.day)
      }
      if (route.query.mealplan) {
        await shoppingListService.getShoppingListByMealPlanId(route.query.mealplan)

      }
    }

    return {
      days: computed(() => AppState.activeDays),
      ingredients: computed(() => AppState.shoppingList),
      day: computed(() => AppState.activeDay),
      route
    }
  }
};
</script>


<style lang="scss" scoped>

</style>