<template>
    <div class="container-fluid">
        <h1 class="mt-1">MEAL PLAN NAME</h1>
        <MealPlan />


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import MealPlan from '../components/MealPlan.vue';
export default {
    setup() {
        return {};
    },
    components: { MealPlan }
};
</script>


<style lang="scss" scoped>

</style>