<template>
    <div class="component">
        <v-tour name="myTour" :steps="steps"></v-tour>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    name: 'my-tour',
    setup() {
        return {
            steps: [
                {
                    target: '#tour-0-welcome',  // We're using document.querySelector() under the hood
                    header: {
                        title: 'Welcome to Supper Setter!',
                    },
                    content: `Ready to create your first meal plan?`
                },
                {
                    target: '#tour-1-login',
                    content: 'Create an account to get started.'
                },
                {
                    target: '#tour-2-browse',
                    content: `Then browse our recipes for inspiration.\nLet's go! `,
                    // params: {
                    //     placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
                    // }
                }
            ]
        }
    },
    mounted: function () {
        this.$tours['myTour'].start()
    }
};
</script>


<style lang="scss" scoped>

</style>