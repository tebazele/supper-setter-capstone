<template>
  <div class="about">
    <h1>This is the about page</h1>
    <section class="row justify-content-center">
      <!-- v-for over the col-10 -->
      <div class="col-10 bg-white elevation-1">
        <RecipeCard />
      </div>
    </section>
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";

export default {
  setup() {
    return {};
  },
  components: { RecipeCard }
}
</script>
