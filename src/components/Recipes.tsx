import { useState } from 'react'
import type { Recipe } from '../types'
import RecipeCard from './RecipeCard'
import RecipeModal from './RecipeModal'

import { useRecipes } from '../contexts/recipes.context'
import { useUsers } from '../contexts/users.context'

export const Recipes = () => {

  const {searchInput, filteredRecipes, displayRecipes, favoriteRecipes } = useRecipes();
  const {currentUser} = useUsers();

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