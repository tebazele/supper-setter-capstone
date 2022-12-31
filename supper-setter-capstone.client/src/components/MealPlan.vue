<template>
    <router-link :to="{ name: 'MealPlans' }">
        <div class="component">
            <h3 class="mt-3">Day 1</h3>
            <div class="border border-dark border-2 rounded px-2 pt-2 my-2">
                <div class="d-flex justify-content-between">
                    <h6>Breakfast</h6>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add
                        recipe</button>
                </div>
                <ul>
                    <li class="my-3"><img
                            src="https://images.unsplash.com/photo-1571748982800-fa51082c2224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                            class="thumbnail" /> Overnight Oats <i class="mdi mdi-delete text-danger"
                            title="Delete recipe"></i></li>
                    <li class="my-3"> <img
                            src="https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                            class="thumbnail" /> Chopped Bananas</li>
                </ul>
                <hr>
                <h6>Lunch</h6>
                <ul>
                    <li class="my-3"><img
                            src="https://images.unsplash.com/photo-1571748982800-fa51082c2224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                            class="thumbnail" /> Reuben Sandwich</li>
                    <li class="my-3"> <img
                            src="https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                            class="thumbnail" /> Homemade Potato Chips</li>
                </ul>
                <hr>
                <h6>Dinner</h6>
                <ul>
                    <li class="my-3"><img
                            src="https://images.unsplash.com/photo-1571748982800-fa51082c2224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                            class="thumbnail" /> Overnight Oats</li>
                    <li class="my-3"> <img
                            src="https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                            class="thumbnail" /> Chopped Bananas</li>
                </ul>
            </div>

        </div>
    </router-link>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Your Recipes</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex">

                        <section class="row" v-for="m in myRecipes" :key="m.edamamId">

                            <div class="col-12 m-1">
                                <p>{{ m.label }}</p>
                                <img :src="m.image" alt="food" class="img-fluid thumbnail" />
                            </div>

                        </section>
                    </div>
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
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    setup() {
        return {
            myRecipes: computed(() => AppState.myRecipes)
        }
    }
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

ul {
    list-style: none;
}
</style>