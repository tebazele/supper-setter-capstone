<template>
  <div class="container-fluid serif-pro">
    <div class="d-flex my-2 justify-content-between">
      <h2 v-if="mealPlan" class="mt-1 raleway d-flex justify-content-between">
        {{ mealPlan.name }}

      </h2>
      <!-- <div v-if="creator">
        <img :src="creator.picture" class="img-fluid tiny-img rounded-circle border border-dark border-1" />
      </div> -->
    </div>
    <section class="row">
      <!-- <p>{{ plannedMealsByDay }}</p> -->
      <div class="col-12" v-for="(ps, index) in plannedMealsByDay" :key="index">
        <h6>{{ days[index] }}</h6>
        <div class="d-flex justify-content-between">
          <h5 class="raleway">Day {{ index + 1 }} <span @click="deleteDay(ps.dayId)"
              class="mdi mdi-delete text-danger"></span></h5>
          <button v-if="days[index].shopListGenerated" @click="pushDayShoppingList(ps.dayId)"
            class="btn bg-primary border border-dark border-1"><i class="mdi mdi-cart"></i>
            push Day {{ index + 1 }}</button>
          <button v-else @click="createDayShoppingList(ps.dayId)" class="btn bg-primary border border-dark border-1"><i
              class="mdi mdi-cart"></i>
            create List</button>
        </div>
        <!-- <h5>Day {{ index + 1 }}</h5> -->
        <MealPlan :plannedMealsArray="ps.plannedMeals" :dayId="ps.dayId" />
      </div>
    </section>
    <div class="text-end">
      <div class="text-end d-flex justify-content-between">
        <button @click="deleteMealPlan()" class="btn border border-dark bg-danger text-white selectable mb-2"><i
            class="mdi mdi-delete"></i>Delete
          Plan</button>
        <button v-if="mealPlan?.shopListGenerated" @click="pushMealPlanShoppingList(mealPlan.id)"
          class="btn bg-primary border border-dark border-1 mb-2"><i class="mdi mdi-cart"></i>View from
          MealPlan</button>
        <button v-else @click="createMealPlanShoppingList(mealPlan.id)"
          class="btn bg-primary border border-dark border-1 mb-2"><i class="mdi mdi-cart"></i>List from
          MealPlan</button>
        <button class="btn bg-secondary text-white border border-dark me-2 mb-2" @click="createDay">Add Day</button>
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
          <!-- STUB search myRecipes -->
          <form @submit.prevent="searchMyRecipes()" class="my-2 text-end">
            <input class="rounded-start" type="text" v-model="search.query" placeholder="Search Your Recipes">
            <button class=" rounded-end bg-primary btn-info mdi mdi-magnify"></button>
          </form>
          <h4 class="raleway">Sort Your Recipes</h4>
          <!-- STUB filter my Recipes buttons -->
          <div class="d-flex">
            <button @click="
            filterBy = 'breakfast'; search.query = ''" class="same-width btn btn-outline-dark me-1">Breakfast</button>
            <button @click="filterBy = 'lunch/dinner'; search.query = ''"
              class="same-width btn btn-outline-dark me-1">Lunch/
              Dinner</button>
            <button @click="() => {
              search.query = '';
              searchMyRecipes()
            }" class="same-width btn btn-outline-dark">All</button>

          </div>
          <section class="row" v-for="m in nonArchivedMyRecipes" :key="m.edamamId">
            <div @click="createPlannedMeal(m.id)"
              class="selectable ms-3 mt-2 col-11 d-flex justify-content-between align-items-baseline m-1 bg-grey">
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
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import { mealPlansService } from '../services/MealPlansService.js';
import { plannedMealsService } from '../services/PlannedMealsService.js';
import MealPlan from '../components/MealPlan.vue';
import { Modal } from 'bootstrap';
import { recipesService } from '../services/RecipesService.js';
import { shoppingListService } from "../services/ShoppingListService.js";
export default {
  setup() {
    const filterBy = ref('')
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
      filterBy,
      search,
      mealPlan: computed(() => AppState.activeMealPlan),
      // creator: computed(() => AppState.activeMealPlan.creator),
      days: computed(() => AppState.activeDays),
      plannedMealsByDay: computed(() => AppState.plannedMeals),
      myRecipes: computed(() => AppState.myRecipes),
      nonArchivedMyRecipes: computed(() => {
        let filteredRecipes = AppState.myRecipes.filter(r => r.archived == false);
        if (filterBy.value == "") {
          return filteredRecipes;
        } else {
          logger.log(filterBy.value)
          return filteredRecipes.filter(r => r.mealType[0] == filterBy.value)
        }

      }),
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
          filterBy.value = ''
          search.query = ''
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },
      async createDayShoppingList(dayId) {
        await shoppingListService.generateShoppingListByDayId(dayId)
        // router.push({ name: 'ShoppingList', query: { day: `${dayId}` } })
      },
      async createMealPlanShoppingList(mealPlanId) {
        await shoppingListService.generateShoppingListByMealPlanId(mealPlanId)
        // router.push({ name: 'ShoppingList', query: { mealplan: `${mealPlanId}` } })
      },
      async pushDayShoppingList(dayId) {
        router.push({ name: 'ShoppingList', query: { day: `${dayId}` } })
      },
      async pushMealPlanShoppingList(mealPlanId) {
        router.push({ name: 'ShoppingList', query: { mealplan: `${mealPlanId}` } })
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
      },

      async searchMyRecipes() {
        try {
          filterBy.value = ''
          await recipesService.searchMyRecipes(search.query)
          search.query = ''
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

.tiny-img {
  width: 40px;
  height: 40px;
}

.same-width {
  width: 32vw;
}
</style>