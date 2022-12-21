<template>
  <!-- NOTE Here is some welcome stuff....  -->
  <section class="row justify-content-center container-fluid">
    <div class="col-8">
      <h1 class="text-center fw-bold raleway">
        Welcome! To Supper Setter
      </h1>
      <p class="raleway fs-5">Cut your time spent planning your meals and shopping list's. You can manage your recipes,
        ingredients, meal types & grocery items with this clean, uncluttered interface Our Meals combines recipe
        management, meal
        planning & grocery shopping</p>
    </div>

  </section>
  <!-- NOTE adding recipe cards here...  -->
  <section>
    <div v-for="r in recipe">
      <RecipeCard />
      <!-- yo this is a git test -->
    </div>
  </section>

</template>

<script>
import RecipeCard from '../components/RecipeCard.vue'
import { onMounted } from '@vue/runtime-core'
import { recipesService } from '../services/RecipesService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    async function getFeaturedRecipes() {
      let query = "chicken";
      try {
        await recipesService.getFeaturedRecipes(query);
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

    }
  },
  components: { RecipeCard }
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
