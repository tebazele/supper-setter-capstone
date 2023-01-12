<template>
  <div class="container-fluid serif-pro">

    <div v-if="mealPlan">
      <h2 class="mt-1 raleway">
        {{ mealPlan.name }}

      </h2>
    </div>
    <section class="row">
      <!-- <p>{{ plannedMealsByDay }}</p> -->
      <div class="col-12" v-for="(ps, index) in plannedMealsByDay" :key="index">
        <div class="d-flex justify-content-between">

          <h5 class="raleway">Day {{ index + 1 }} <span @click="deleteDay(ps.dayId)" class="mdi mdi-delete"></span></h5>
          <button @click="createDayShoppingList(ps.dayId)" class="btn btn-info border border-dark border-1">Shopping
            List</button>
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
      <div class="text-end d-flex justify-content-between">
        <button @click="deleteMealPlan()" class="btn border border-dark bg-danger text-white selectable mb-2"><i
            class="mdi mdi-delete"></i>Delete
          Plan</button>
        <button class="btn bg-secondary border border-dark me-2 mb-2" @click="createDay">Add Day</button>

      </div>

    </div>
  </div>

  <div class="modal fade serif-pro" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Your Recipes</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="searchMyRecipes()" class="my-2 text-end">
            <input class="rounded-start" type="text" v-model="search.query" placeholder="Search Your Recipes">

            <button class=" rounded-end bg-primary btn-info mdi mdi-magnify"></button>

          </form>
          <h4 class="raleway">Sort Your Recipes</h4>
          <div class="d-flex">
            <button class="btn btn-outline-dark me-1">Breakfast</button>
            <button class="btn btn-outline-dark me-1">Lunch</button>
            <button class="btn btn-outline-dark">Dinner</button>

          </div>


          <section class="row" v-for="m in nonArchivedMyRecipes" :key="m.edamamId">

            <div @click="createPlannedMeal(m.id)"
              class="ms-3 mt-2 col-11 d-flex justify-content-between align-items-baseline m-1 bg-grey">

              <p class="roboto-slab">{{ m.label }}</p>

              <img :src="m.image" alt="food" class="thumbnail selectable" />
            </div>

          </section>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
    const search = reactive({
      query: ''
    })
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
      search,
      mealPlan: computed(() => AppState.activeMealPlan),
      days: computed(() => AppState.activeDays),
      plannedMealsByDay: computed(() => AppState.plannedMeals),
      myRecipes: computed(() => AppState.myRecipes),
      nonArchivedMyRecipes: computed(() => AppState.myRecipes.filter(r => r.archived == false)),


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
          if (await Pop.confirm('Are you sure you want to delete this meal plan?', "You can't go back")) {
            await mealPlansService.deleteMealPlan(route.params.mealPlanId)
            router.push({ name: 'Account' })
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      async deleteDay(dayId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this day?', '')) {
            await daysService.deleteDay(dayId)
          }
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
// FIXME style this
.thumbnail {
  width: 80px;
  height: 60px;
  object-position: center;
  object-fit: cover;
  vertical-align: bottom;
  transform: translateY(10px);
}
</style>