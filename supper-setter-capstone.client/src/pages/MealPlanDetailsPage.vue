<template>
  <div class="container-fluid">
    <div class="text-end p-2">
      <button class="btn btn-success me-2" @click="createDay">Create Day</button>

    </div>
    <div v-if="mealPlan">
      <h2>
        {{ mealPlan.name }}

      </h2>
    </div>
    <section class="row">
      <!-- <p>{{ plannedMealsByDay }}</p> -->
      <div class="col-12" v-for="(ps, index) in plannedMealsByDay" :key="index">
        <div class="d-flex justify-content-between">

          <h5>Day {{ index + 1 }}</h5>
          <button @click="createDayShoppingList(ps.dayId)" class="btn btn-info">Shopping List</button>
        </div>
        <!-- <h5>Day {{ index + 1 }}</h5> -->
        <MealPlan :plannedMealsArray="ps.plannedMeals" :dayId="ps.dayId" />
      </div>
    </section>
    <!-- <div v-for="d in days" :key="d.id">
      <p>Breakfast</p>
      <ul v-for="(b, index) in d.breakfastRecipes" :key="index">
        <li>{{ b }}</li>
      </ul>
      <ul>
        <li>Add a breakfast recipe</li>
      </ul>
      <p>Lunch</p>
      <ul v-for="(l, index) in d.lunchRecipes" :key="index">
        <li>{{ l }}</li>
      </ul>
      <ul>
        <li>Add a lunch recipe</li>
      </ul>
      <p>Dinner</p>
      <ul v-for="(s, index) in d.dinnerRecipes" :key="index">
        <li>{{ s }}</li>
      </ul>
      <ul>
        <li>Add a dinner recipe</li>
      </ul>
    </div> -->
    <div class="text-end">
      <button class="btn btn-danger"><i class="mdi mdi-delete" @click="deleteMealPlan"></i></button>

    </div>
  </div>

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

              <img :src="m.image" alt="food" class="img-fluid thumbnail selectable" @click="createPlannedMeal(m.id)" />
            </div>

          </section>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>


</template>


<script>
import { logger } from '../utils/Logger.js';
import { daysService } from '../services/DaysService.js';
import Pop from '../utils/Pop.js';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { mealPlansService } from '../services/MealPlansService.js';
import { plannedMealsService } from '../services/PlannedMealsService.js';
import MealPlan from '../components/MealPlan.vue';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const router = useRouter()
    watchEffect(() => {
      if (AppState.activeDays) {
        getPlannedMeals(AppState.activeDays);

      }

    });
    onMounted(() => {
      getDays();
      getMealPlanById();
      // getPlannedMeals(AppState.activeDays)

    });
    const route = useRoute();
    async function getPlannedMeals(daysArray) {
      try {
        await plannedMealsService.getPlannedMeals(daysArray);
      }
      catch (error) {
        Pop.error(error.message);
        logger.log(error);
      }
    }
    async function getDays() {
      try {
        await daysService.getDays(route.params.mealPlanId);
      }
      catch (error) {
        Pop.error(error.message);
        logger.log(error);
      }
    }
    async function getMealPlanById() {
      try {
        await mealPlansService.getMealPlanById(route.params.mealPlanId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    return {
      mealPlan: computed(() => AppState.activeMealPlan),
      days: computed(() => AppState.activeDays),
      plannedMealsByDay: computed(() => AppState.plannedMeals),
      myRecipes: computed(() => AppState.myRecipes),


      async createDay() {
        try {
          await daysService.createDay(route.params.mealPlanId);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },



      async createPlannedMeal(recipeId) {
        // NOTE send up {mealType: activeMealType.value} and find dayId by matching dayName, grab recipeId from clicking on recipe
        try {

          logger.log(recipeId)
          await plannedMealsService.createPlannedMeal(recipeId)
          Modal.getOrCreateInstance('#exampleModal').hide()
          // TODO close the modal
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      async createDayShoppingList(dayId) {
        router.push({ name: 'ShoppingList', query: { day: `${dayId}` } })
      },




      async deleteMealPlan() {
        try {

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
.thumbnail {
  width: 30vh;
  height: 15vh;
  object-position: center;
  object-fit: cover;
  vertical-align: bottom;
}
</style>