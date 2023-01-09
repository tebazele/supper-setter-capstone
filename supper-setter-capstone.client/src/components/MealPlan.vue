<template>
    <!-- <router-link :to="{ name: 'MealPlans' }"> -->
    <div class="component">
        <!-- <h3 class="mt-3" v-if="plannedMealsArray[0]">{{ plannedMealsArray[0].day.name }}</h3>
            <h3 v-else>Day Null</h3> -->
        <div class="border border-dark border-2 rounded px-2 pt-2 my-2">
            <div class="d-flex justify-content-between">
                <h6>Breakfast</h6>
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add
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
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add
                    recipe</button>

            </div>
            <ul v-for="l in lunchMeals" :key="l.id">
                <li v-if="l.recipe" class="my-3"><img :src="l.recipe.image" class="thumbnail" /> {{ l.recipe.label
}} <i @click="deletePlannedMeal(l.id)" class="mdi mdi-delete text-danger" title="Delete recipe"></i>
                </li>

            </ul>
            <hr>
            <div class="d-flex justify-content-between">

                <h6>Dinner</h6>
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add
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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Your Recipes</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">


                    <section class="row" v-for="m in myRecipes" :key="m.edamamId">

                        <div class="col-12 d-flex justify-content-between m-1">
                            <p>{{ m.label }}</p>

                            <img :src="m.image" alt="food" class="img-fluid thumbnail selectable" />
                        </div>

                    </section>

                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div> -->
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { plannedMealsService } from '../services/PlannedMealsService.js';
export default {
    props: {
        plannedMealsArray: { type: Array, required: true }
    },
    setup(props) {
        return {
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