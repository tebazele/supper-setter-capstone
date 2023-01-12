<template>
  <div>

    <div v-for="i in ingredients" class="d-flex">

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
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      loadShoppingList()
    })

    async function loadShoppingList() {
      if (route.query.day) {
        await shoppingListService.getShoppingListByDayId(route.query.day)
      }
      if (route.query.mealplan) {
        await shoppingListService.getShoppingListByMealPlanId(route.query.mealplan)
      }
      else {
        Pop.error('Please go back to your collection page to generate a shopping list')
        //TODO rework handling make this draw on page itself not pop//
      }
    }

    return {
      days: computed(() => AppState.activeDays),
      ingredients: computed(() => AppState.shoppingList),
      route
    }
  }
};
</script>


<style lang="scss" scoped>

</style>