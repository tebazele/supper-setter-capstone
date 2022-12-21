<template>
  <div class="component">


    <img
      src="https://images.unsplash.com/photo-1587116861219-230ac19df971?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      alt="meal" class="img-fluid cardImg my-2" title="https://thiscatdoesnotexist.com">
    <h4>Sauteed Scallops with Sauce</h4>
    <div class="d-flex justify-content-between">
      <i class="mdi mdi-clock">30</i>
      <p>1250 Calories</p>
    </div>
    <!-- FOR EACH DIET TAG?? -->
    <div class="d-flex justify-content-evenly">
      <h5 class="bg-danger text-white rounded">High-Protein</h5>
      <h5 class="bg-danger text-white rounded">Low-Carb</h5>
      <h5 class="bg-danger text-white rounded">Low-Carb</h5>
    </div>
    <div class="div d-flex justify-content-end">
      <p>Serves 4</p>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.cardImg {
  object-fit: cover;
  height: 20vh;
  width: 45vh
}
</style>