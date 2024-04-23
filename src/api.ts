import { Recipe } from "./types";

const baseUrl = 'http://localhost:3000';

export const getAllRecipes = (): Promise<Recipe[]> => {

  return fetch(`${baseUrl}/recipes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not get recipes! Status: ${response.status}`)
      }
      return response.json();
    })
}

export const postRecipe = (recipe: Omit<Recipe, 'id'>) => {

  return fetch(`${baseUrl}/recipes`, {    
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not post recipe! Status: ${response.status}`)
    }
    return response.json();
  })
}

//need to fetch a recipe via it's id
export const fetchRecipe = (recipe: Recipe) => {
  return fetch(`${baseUrl}/recipes/${recipe.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json();
    })
}

//this will be used in handleHeartClick func to fav or unfav a recipe
export const updateRecipe = (recipe: Recipe) => {
  return fetch(`${baseUrl}/recipes/${recipe.id}`, {
    body: JSON.stringify(recipe),
    method: 'PATCH',
    headers: {
      ['Content-Type']: 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json();
    })
}