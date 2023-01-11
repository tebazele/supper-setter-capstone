<template>
  <div class="component">


  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import { shoppingListService } from "../services/ShoppingListService.js";
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      loadShoppingList()
    })

    async function loadShoppingList() {

      if (route.query.params = day) {
        await shoppingListService.getShoppingListByDayId()
      }

    }

    return {
      days: computed(() => AppState.activeDays)



    }
  }
};
</script>


<style lang="scss" scoped>

</style>