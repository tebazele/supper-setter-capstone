<template>
    <!-- <router-link :to="{ name: 'MealPlans' }"> -->
    <div class="component">
        <!-- <h3 class="mt-3" v-if="plannedMealsArray[0]">{{ plannedMealsArray[0].day.name }}</h3>
        <h3 v-else>Day Null</h3> -->
        <div class="border border-dark border-2 rounded px-2 pt-2 my-2">
            <div class="d-flex justify-content-between">

                <h3>Breakfast</h3>
                <button class="btn bg-secondary border border-dark border-1" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" @click="() => {
                        editable.mealType = 'breakfast';
                        editable.dayId = dayId;
                        setEditableInAppState()
                    }">Add
                    recipe</button>
            </div>
            <div v-for="b in breakfastMeals" :key="b.id" class="text-center mt-2">
                <img :src="b.recipe.image" class="thumbnail rounded" />
                <p v-if="b.recipe" class="my-1 fw-bold roboto-slab p-2"> {{
                    b.recipe.label
                }} <i @click="deletePlannedMeal(b.id)" class="mdi mdi-delete text-danger" title="Delete recipe"></i>
                </p>


            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <h3>Lunch</h3>
                <button @click="() => {
                    editable.mealType = 'lunch';
                    editable.dayId = dayId;
                    setEditableInAppState()
                }" class="btn bg-secondary border border-dark border-1" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">Add
                    recipe</button>

            </div>
            <div v-for="l in lunchMeals" :key="l.id" class="text-center mt-2">
                <img :src="l.recipe.image" class="thumbnail rounded" />
                <p v-if="l.recipe" class="my-1 fw-bold roboto-slab p-2"> {{
                    l.recipe.label
                }} <i @click="deletePlannedMeal(l.id)" class="mdi mdi-delete text-danger" title="Delete recipe"></i>
                </p>

            </div>
            <hr>
            <div class="d-flex justify-content-between">

                <h3>Dinner</h3>
                <button @click="() => {
                    editable.mealType = 'dinner';
                    editable.dayId = dayId
                    setEditableInAppState()
                }" class="btn bg-secondary border border-dark border-1 mb-1" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">Add
                    recipe</button>
            </div>
            <div class="text-center mt-2" v-for="d in dinnerMeals" :key="d.id">
                <img :src="d.recipe.image" class="thumbnail rounded" />
                <p v-if="d.recipe.id" class="my-1 fw-bold roboto-slab p-2"> {{
                    d.recipe.label
                }} <i @click="deletePlannedMeal(d.id)" class="mdi mdi-delete text-danger" title="Delete recipe"></i>
                </p>

            </div>
        </div>

    </div>
    <!-- </router-link> -->

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { plannedMealsService } from '../services/PlannedMealsService.js';
export default {
    props: {
        plannedMealsArray: { type: Array, required: true },
        dayId: { type: String, required: true }
    },
    setup(props) {
        const editable = reactive({
            mealType: '',
            dayId: ''
        })
        return {
            editable,
            myRecipes: computed(() => AppState.myRecipes),
            entirePlannedMealArray: computed(() => AppState.plannedMeals),
            breakfastMeals: computed(() => props.plannedMealsArray.filter(m => m.type == 'breakfast')),
            lunchMeals: computed(() => props.plannedMealsArray.filter(m => m.type == 'lunch')),
            dinnerMeals: computed(() => props.plannedMealsArray.filter(m => m.type == 'dinner')),


            async deletePlannedMeal(plannedMealId) {
                try {
                    if (await Pop.confirm('Are you sure you want to delete this recipe?')) {
                        await plannedMealsService.deletePlannedMeal(plannedMealId)
                    }
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)
                }
            },
            // NOTE sends mealType and day name to AppState as an object so Meal Plan Details page can use them to create PlannedMeal
            setEditableInAppState() {
                AppState.activePlannedMealRequestBody = editable
                logger.log(AppState.activePlannedMealRequestBody)
            }


        }

    }
};
</script>


<style lang="scss" scoped>
.thumbnail {
    width: 90vw;
    height: 35vh;
    object-position: center;
    object-fit: cover;
    vertical-align: bottom;

}

.move-up {
    transform: translateY(-50px);
}

ul {
    list-style: none;
}
</style>