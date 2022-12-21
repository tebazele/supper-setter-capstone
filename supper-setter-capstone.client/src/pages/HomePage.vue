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
    <div v-for="r in recipe ">
      <RecipeCard />
    </div>
  </section>

</template>

<script>
export default {
  setup() {
    async function getFeaturedRecipes() {
      let query = 'chicken'
      try {
        await recipesService.getFeaturedRecipes(query)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }

    }
    return {}
  }
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
