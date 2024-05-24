export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string;
  instructions: string;
  cuisine: string;
}

export interface Ingredient {
  id: string;
  title: string;
}

export interface IngredientToRecipe {
  id: string;
  ingredientId: string;
  recipeId: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Favorite {
  id: string;
  userId: string | undefined;
  recipeId: string;
}