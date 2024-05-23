import { useState } from 'react'
import type { Recipe, User, Favorite } from '../types'
import RecipeCard from './RecipeCard'
import RecipeModal from './RecipeModal'

interface RecipesProps {
  searchInput: string;
  filteredRecipes: Recipe[];
  displayRecipes: Recipe[];
  favoriteRecipes: Favorite[];
  currentUser: User | null;
  toggleFavRecipe: (favRecipe: Omit<Favorite, 'id'>) => Promise<string | void>;
}

const Recipes = ({searchInput, filteredRecipes, displayRecipes, favoriteRecipes, currentUser, toggleFavRecipe}: RecipesProps ) => {

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);

  return (
    <>
      {searchInput ? (
        <div className='recipe-grid'>
          {filteredRecipes.map((recipe: Recipe) => {
            const isFavorite = !!favoriteRecipes.find((favorite) => favorite.userId === currentUser?.id && favorite.recipeId === recipe.id)
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                cardClickHandler={() => setSelectedRecipe(recipe)}
                isFavorite={isFavorite}
                currentUser={currentUser}
                toggleFavRecipe={toggleFavRecipe}
              />
          )
          })}
        </div>
        ) : (
        <div className='recipe-grid'>
          {displayRecipes.map((recipe: Recipe) => {
            const isFavorite = !!favoriteRecipes.find((favorite) => favorite.userId === currentUser?.id && favorite.recipeId === recipe.id)
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                cardClickHandler={() => setSelectedRecipe(recipe)}
                isFavorite={isFavorite}
                currentUser={currentUser}
                toggleFavRecipe={toggleFavRecipe}
              />
            );
          })}
        </div>
      )}

      {/* if a recipe card is clicked the modal opens */}
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(undefined)} />}
    </>
    
  )
}

export default Recipes;