<template>
    <div class="container-fluid">
        <section class="row justify-content-between">
            <div class="col-8">
                <!-- STUB write the post function -->
                <form class="d-flex mt-3" @submit="createMealPlan">
                    <input placeholder="Give your meal plan a name" class="w-100" v-model="mealPlanName" /><button
                        class="btn btn-primary">Save</button>
                </form>
                <!-- FIXME -->
                <h4>{{ mealPlanName }}</h4>
                <i @click="editMealPlanName" class="mdi mdi-save"></i>
            </div>
            <div class="col-4 text-end mt-3">
                <button class="btn btn-info">Add Day</button>
            </div>
        </section>

        <MealPlan />


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import MealPlan from '../components/MealPlan.vue';
export default {
    setup() {
        mealPlanName = ref()
        async function createMealPlan() {

        }

        return {
            mealPlanName
        };
    },
    components: { MealPlan }
};
</script>


<style lang="scss" scoped>

</style>