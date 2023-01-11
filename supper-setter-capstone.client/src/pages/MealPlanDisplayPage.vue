<template>
    <div class="container-fluid">
        <section v-if="displayForm" class="row justify-content-between">
            <div class="col-8">
                <!-- STUB write the post function -->
                <form class="d-flex mt-3" @submit.prevent="createMealPlan">
                    <input placeholder="Give your meal plan a name" class="w-100" v-model="mealPlanName"
                        maxlength="50" /><button class="btn btn-primary">Save</button>
                </form>
                <!-- NOTE form validation on front end done -->

            </div>
            <div class="col-4 text-end mt-3">
                <button class="btn btn-info">Add Day</button>
            </div>
        </section>
        <section v-else class="row">
            <div class="col-12">
                <h4 class="mt-2">{{ mealPlanName }} <i @click="editMealPlanName" class="mdi mdi-pen"></i></h4>

            </div>
        </section>

        <!-- <MealPlan /> -->


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import MealPlan from '../components/MealPlan.vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { mealPlansService } from '../services/MealPlansService.js'
import { router } from "../router";
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter()
        const mealPlanName = ref()
        const displayForm = ref(true)


        return {
            mealPlanName,
            displayForm,
            async createMealPlan() {
                try {

                    // logger.log(mealPlanName.value)
                    const mealPlan = await mealPlansService.createMealPlan(mealPlanName.value)
                    logger.log('These are the days on the new plan' + AppState.activeDays)
                    logger.log('These are the planned meals on the new plan' + AppState.plannedMeals)
                    displayForm.value = false
                    Pop.toast('meal plan created')
                    router.push({ name: 'MealPlanDetails', params: { mealPlanId: mealPlan.id } })
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)
                }
            }
        };
    },
    components: { MealPlan }
};
</script>


<style lang="scss" scoped>

</style>