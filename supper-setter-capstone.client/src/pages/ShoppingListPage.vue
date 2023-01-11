<template>
    <div>
        <h1>hello hello</h1>
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

            if (route.query.day) {
                await shoppingListService.getShoppingListByDayId(route.query.day)
            }

        }

        return {
            days: computed(() => AppState.activeDays),
            ingredients: computed(() => AppState.shoppingList),



        }
    }
};
</script>


<style lang="scss" scoped>

</style>