<template>
    <div class="component">
        <h3 class="mt-3">Day 1</h3>
        <div class="border border-dark border-2 rounded px-2 pt-2 my-2">
            <h6>Breakfast</h6>
            <ul>
                <li class="my-3"><img
                        src="https://images.unsplash.com/photo-1571748982800-fa51082c2224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                        class="thumbnail" /> Overnight Oats</li>
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