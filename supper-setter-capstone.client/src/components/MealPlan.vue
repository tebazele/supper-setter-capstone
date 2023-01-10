<template>
    <!-- <router-link :to="{ name: 'MealPlans' }"> -->
    <div class="component">
        <!-- <h3 class="mt-3" v-if="plannedMealsArray[0]">{{ plannedMealsArray[0].day.name }}</h3>
            <h3 v-else>Day Null</h3> -->
        <div class="border border-dark border-2 rounded px-2 pt-2 my-2">
            <div class="d-flex justify-content-between">

                <h6>Breakfast</h6>
                <!-- NOTE this button toggles modal and sets mealType to breakfast -->
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="() => {
                    editable.mealType = 'breakfast';
                    editable.dayId = dayId;
                    setEditableInAppState()
                }">Add
                    recipe</button>
            </div>
            <ul v-for="b in breakfastMeals" :key="b.id">

                <li v-if="b.recipe" class="my-3"><img :src="b.recipe.image" class="thumbnail" /> {{
                    b.recipe.label
                }} <i @click="deletePlannedMeal(b.id)" class="mdi mdi-delete text-danger" title="Delete recipe"></i>
                </li>


            </ul>
            <hr>
            <div class="d-flex justify-content-between">
                <h6>Lunch</h6>
                <button @click="() => {
                    editable.mealType = 'lunch';
                    editable.dayId = dayId;
                    setEditableInAppState()
                }" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add
                    recipe</button>

            </div>
            <ul v-for="l in lunchMeals" :key="l.id">
                <li v-if="l.recipe" class="my-3"><img :src="l.recipe.image" class="thumbnail" /> {{
                    l.recipe.label
                }} <i @click="deletePlannedMeal(l.id)" class="mdi mdi-delete text-danger" title="Delete recipe"></i>
                </li>

            </ul>
            <hr>
            <div class="d-flex justify-content-between">

                <h6>Dinner</h6>
                <button @click="() => {
                    editable.mealType = 'dinner';
                    editable.dayId = dayId
                    setEditableInAppState()
                }" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add
                    recipe</button>
            </div>
            <ul v-for="d in dinnerMeals" :key="d.id">
                <li v-if="d.recipe.id" class="my-3"><img :src="d.recipe.image" class="thumbnail" /> {{
                    d.recipe.label
                }} <i @click="deletePlannedMeal(d.id)" class="mdi mdi-delete text-danger" title="Delete recipe"></i>
                </li>

            </ul>
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
    width: 30vh;
    height: 15vh;
    object-position: center;
    object-fit: cover;
    vertical-align: bottom;
}

ul {
    list-style: none;
}
</style>