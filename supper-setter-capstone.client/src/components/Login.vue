<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <!-- <div class="dropdown dropstart my-2 my-lg-0"> -->
      <!-- <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false"> -->
      <!-- <div v-if="account.picture || user.picture">
        <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded-circle p-2" />
      </div> -->
      <!-- </div> -->
      <!-- <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown"> -->
      <div class="list-group text-end">
        <router-link :to="{ name: 'Account' }">
          <div class=" btn text-success lighten-30 selectable text-uppercase m-0">
            Your Meal Plans
          </div>
        </router-link>
        <div class="lighten-10 text-uppercase text-light selectable p-1 me-1" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
