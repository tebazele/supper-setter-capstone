<template>
  <div>
    <h2 v-if="activeDay && route.query.day" class="p-1 mb-3">{{ activeDay.name }} of {{ activeDay.mealPlan.name }}
      shopping
      list </h2>
    <h2 v-if="activeMealPlan && route.query.mealplan" class="p-1 mb-3">{{ activeMealPlan.name }} shopping
      list </h2>
    <div v-for="i in ingredients" class="d-flex ">

      <div class="form-check ms-2">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="i.checked"
          @change="checkIngredient(i._id)">
        <label class="form-check-label" for="flexCheckDefault">

        </label>
      </div>

      <p>{{ i.food }}
        <span v-if="i.quantity != 0">
          {{ i.quantity }}
        </span>
        {{ i.measure }}
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
import { mealPlansService } from "../services/MealPlansService.js";
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      loadShoppingList()
    })

    async function loadShoppingList() {
      if (route.query.day) {
        await shoppingListService.getDayShopList(route.query.day)
        await daysService.getDayInfoByDayId(route.query.day)
      }
      if (route.query.mealplan) {
        await shoppingListService.getMealPlanShopList(route.query.mealplan)
        await mealPlansService.getMealPlanById(route.query.mealplan)
      }
    }

    // TODO STILL NEEDS TO SEE IF DAY OR MEALPLAN FOR API ROUTE
    async function checkIngredient(ingredientId) {
      await shoppingListService.checkIngredient(route.query.dayId, ingredientId)
    }


    return {
      days: computed(() => AppState.activeDays),
      ingredients: computed(() => AppState.shoppingList),
      activeDay: computed(() => AppState.activeDay),
      activeMealPlan: computed(() => AppState.activeMealPlan),
      route,
      checkIngredient
    }
  }
};
</script>


<style lang="scss" scoped>

</style>