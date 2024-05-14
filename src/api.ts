import { Recipe, User, Ingredient, IngredientToRecipe, Favorite } from "./types";

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

export const getIngredientsList = (): Promise<Ingredient[]> => {
  return fetch(`${baseUrl}/ingredients`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not get ingredients! Status: ${response.status}`)
      }
      return response.json();
    })
}

export const getIngredientToRecipes = (): Promise<IngredientToRecipe[]> => {
  return fetch(`${baseUrl}/ingredientToRecipes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not get ingredientToRecipes! Status: ${response.status}`)
      }
      return response.json();
    })
}

export const getAllUsers = (): Promise<User[]> => {

  return fetch(`${baseUrl}/users`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not get users! Status: ${response.status}`)
      }
      return response.json();
    })
}

export const postRecipe = (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {

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
    return response.json() as Promise<Recipe>;
  })
}

export const postIngredient = (ingredient: Omit<Ingredient, 'id'>) => {
  return fetch(`${baseUrl}/ingredients`, {
    method: 'POST',
    headers: {
      'COntent-Type': 'application/json'
    },
    body: JSON.stringify(ingredient)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not post ingredient! Status: ${response.status}`)
    }
    return response.json();
  })
}

export const postIngredientToRecipe = (ingToRec: Omit<IngredientToRecipe, 'id'>) => {
  return fetch(`${baseUrl}/ingredientToRecipes`, {
    method: 'POST',
    headers: {
      'COntent-Type': 'application/json'
    },
    body: JSON.stringify(ingToRec)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not post ingredientToRecipe! Status: ${response.status}`)
    }
    return response.json();
  })
}

export const postUser = (user: Omit<User, 'id'>) => {

  return fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not post user! Status: ${response.status}`)
    }
    return response.json();
  })
}

export const getAllFavorites = (): Promise<Favorite[]> => {
  return fetch(`${baseUrl}/favorites`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not fetch favorites')
      }
      return response.json();
    })
}

export const postFavorite = (favorite: Omit<Favorite, 'id'>) => {

  return fetch(`${baseUrl}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(favorite)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not post favorite! Status: ${response.status}`)
    }
    return response.json();
  })
}

export const deleteFavorite = (favorite: Favorite) => {
  return fetch(`${baseUrl}/favorites/${favorite.id}`, {
    method: 'DELETE',
  })
  .then((response) => {
    if (!response.ok) throw new Error('Failed to delete recipe!')
  })
}

export const toggleFavorite = async (favRecipe: Omit<Favorite, 'id'>) => {

  const allFavorites = await getAllFavorites();
  const matchingFavorite = allFavorites.find((fav) => fav.userId === favRecipe.userId && fav.recipeId === favRecipe.recipeId);

  if (!matchingFavorite) {
    return await postFavorite(favRecipe);
  }

  return await deleteFavorite(matchingFavorite);
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