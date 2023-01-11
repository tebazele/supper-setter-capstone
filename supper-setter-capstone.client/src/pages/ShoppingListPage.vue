<template>
    <div class="component">


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
export default {
    setup() {
        const route = useRoute();
        onMounted(() => {
            loadShoppingList()
        })

        async function loadShoppingList() {
            logger.log(route.query)
            logger.log(this.$route.query.test)
            if (route.query.params = day) {
                logger.log(day)
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