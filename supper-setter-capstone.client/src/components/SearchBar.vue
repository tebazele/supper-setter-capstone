<template>
  <form @submit.prevent="searchRecipes()" class="my-2">
    <input class="rounded-start" type="text" v-model="search.query" placeholder="Search Recipes">

    <button class=" rounded-end bg-primary btn-info mdi mdi-magnify"></button>

  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { recipesService } from "../services/RecipesService.js";
import { router } from "../router.js";
export default {
  setup() {
    const search = reactive({
      query: ''
    })
    async function searchRecipes() {
      try {
        await recipesService.getRecipes(search.query)
        router.push(`/search/${search.query}`)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }

    return {
      search,
      searchRecipes
    }
  }
};
</script>


<style lang="scss" scoped>

</style>