<template>
  <h6>test</h6>
  <!-- 
  <section class="row justify-content-center container-fluid">
    <div class="col-12 my-2 text-end">
      <SearchBar />
    </div>
    <div>
      <h1>RESULTS PAGE LOOK AT THIS WOW</h1>
    </div>
  </section>
  <section>
    <div v-for="r in recipes" :key="r.url">
      <RecipeCard :recipe="r" />
    </div>
  </section> -->

</template>

<script>
import RecipeCard from '../components/RecipeCard.vue'
import { onMounted, computed } from '@vue/runtime-core'
import { recipesService } from '../services/RecipesService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import SearchBar from "../components/SearchBar.vue"
export default {
  setup() {
    const route = useRoute();
    async function searchRecipes() {
      try {
        await recipesService.getRecipes(route.params.searchQuery);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      searchRecipes()
    })
    return {
      recipes: computed(() => AppState.recipes)
    }
  },
  components: { RecipeCard, SearchBar }
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
