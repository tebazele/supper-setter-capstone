<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark  light-green">
    <router-link class="navbar-brand d-flex ms-1" :to="{ name: 'Home' }">
      <div>
        <img id='tour-0-welcome' alt="logo" src="../assets/img/logo-green.png" height="65">
        <!-- <h1 class=" raleway">

        Supper Setter <i class="mdi mdi-food"></i>
        </h1> -->
      </div>
    </router-link>
    <button id="tour-1-login" class="navbar-toggler light-green me-3" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li class="text-end">
          <router-link :to="{ name: 'About' }" class="btn light-green selectable text-uppercase">
            About
          </router-link>
        </li>
      </ul>

      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 913px) {
  nav {
    height: 70px;
  }
}

.light-green {
  color: #d7e0c6
}
</style>
