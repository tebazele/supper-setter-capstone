import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})


export const edamamApi = Axios.create({
  baseURL: 'https://api.edamam.com/api/recipes/v2',
  timeout: 8000,
  params: {
    type: 'public',
    app_id: 54586086,
    app_key: 'd8b752a4da7fffc862014e3c3524d868',
  }
})

// Edamam other query params available @ https://developer.edamam.com/edamam-docs-recipe-api

// res.data.hits will give us our array of recipe objects

// api will return 20 at a time if there are more than 20

// MUST send up a query on get recipes request

// api from another source. 
// https://www.themealdb.com/api.php
export const mealdbApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/v1/1',
  timeout: 8000,
})