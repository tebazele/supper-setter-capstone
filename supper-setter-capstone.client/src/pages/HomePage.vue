<template>
  <!-- NOTE Here is some welcome stuff....  -->
  <section class="row justify-content-center container-fluid pe-0 me-0">
    <div class="col-12 my-2 text-end">
      <SearchBar />
    </div>
    <div class="col-12">
      <h1 class="text-center fw-bold raleway">
        Welcome! To Supper Setter
      </h1>
      <p class="roboto-slab mt-4 ms-3 text-justify">Reduce stress, save time, and eat healthier when you plan your
        meals with
        Supper
        Setter. Browse our recipes, create an
        account, and get set for a healthier you!</p>
    </div>

  </section>
  <!-- NOTE adding recipe cards here...  -->
  <div id="tour-2-browse"></div>
  <div class="container">
    <section class="row">
      <div v-for="r in recipes" :key="r.url" class="col-md-4">
        <RecipeCard :recipe="r" />
      </div>
      <div class="text-center pb-3">
        <button @click="loadMoreRecipes" class="btn btn-dark">Load More</button>
      </div>
    </section>

  </div>
  <Tour />
</template>

<script>
import RecipeCard from '../components/RecipeCard.vue'
import { onMounted, computed } from '@vue/runtime-core'
import { recipesService } from '../services/RecipesService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import SearchBar from "../components/SearchBar.vue"
import Tour from '../components/Tour.vue'
export default {
  setup() {
    async function getFeaturedRecipes() {
      let num = Math.floor(Math.random() * AppState.queryOptions.length)
      let query = AppState.queryOptions[num];
      try {
        await recipesService.getRecipes(query);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getFeaturedRecipes()
    })
    return {
      recipes: computed(() => AppState.recipes),

      async loadMoreRecipes() {
        try {
          await recipesService.loadMoreRecipes()
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }

      }
    }
  },
  components: { RecipeCard, SearchBar, Tour }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }

    .raleway {
      font-family: 'Raleway', sans-serif;

    }
  }
}
</style>
