import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/mealplans',
    name: 'MealPlans',
    component: loadPage('MealPlanDisplayPage')
    // FIXME add authGuard protection
  },
  {
    path: '/recipes/:edamamId',
    name: 'RecipeDetails',
    component: loadPage('RecipeDetailsPage')
  },
  {
    path: '/mealPlans/:mealPlanId',
    name: 'MealPlanDetails',
    component: loadPage('MealPlanDetailsPage')
  },
  {
    path: '/search/:searchQuery',
    name: 'SearchResults',
    component: loadPage('SearchResultsPage')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
