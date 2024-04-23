import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as api from "./api";

import type { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { CreateRecipeForm } from './components/CreateRecipeForm';
import toast from 'react-hot-toast';

type ActiveTab = 'all' | 'favorites' | 'createRecipe';

const App = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<ActiveTab>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const pageNumber = useRef(1);

  const refetchRecipes = () => {
    setIsLoading(true);
    return api.getAllRecipes()
      .then((recipes) => setAllRecipes(recipes))
      .catch(() => toast.error('Failed to refetch recipes!'))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    refetchRecipes();
  }, []);

  const createRecipe = (recipe: Omit<Recipe, "id">) => {
    setIsLoading(true);
    return api.postRecipe(recipe)
      .then(() => refetchRecipes())
      .then(() => toast.success('Thanks for creating a new recipe!'))
      .finally(() => setIsLoading(false))
  }

  const handleCreateRecipeTabClick = () => {
    setSelectedTab(prevTab => prevTab === 'createRecipe' ? 'all' : 'createRecipe');
  };

  //here we segregate fav recipes list from all recipes list for diplaying the list on frontend depending on the selected tab
  const favoriteRecipesList = allRecipes.filter((recipe) => recipe.isFavorite);

  const recipesList = {
    all: allRecipes,
    favorites: favoriteRecipesList
  }

  const displayRecipes = recipesList[selectedTab];

  //this is the list of recipes we want to display when a user types something in the search input field
  //we handle the scenario that displayRecipes array could be empty so we don't get any error
  const filteredRecipes = (displayRecipes || []).filter((recipe: Recipe) => recipe.title.toLowerCase().includes(searchInput));

  //heart click handler function which will be used to create func for fav btn and unfav btn click
  const handleHeartClick = (recipe: Recipe, isFavorite: boolean) => {
    setIsLoading(true);
    const recipeCopy = {...recipe, isFavorite}

    api.updateRecipe(recipeCopy)
      .then(() => {
        return recipe.isFavorite
      })
      .then(() => refetchRecipes())
      .catch(() => toast.error('Could not change favorite status!'))
      .finally(() => setIsLoading(false))
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputString = e.target.value.toLowerCase();
    setSearchInput(searchInputString)
  }

  // const handleRecipeCardClick = ()

  //view more btn click handler
  const handleViewMoreClick = () => {
    const nextPage = pageNumber.current + 1;
    api.getAllRecipes()
      .then(nextRecipes => {
        setAllRecipes([...allRecipes, ...nextRecipes]);
        pageNumber.current = nextPage;
      })
      .catch(err => {
        console.log(err);
      });
  };
  

  return (
    <>
      <div className='app-container'>
        <div className='header'>
          <img src='/hero-image.jpg' alt='Hero' />
          <div className='title'>My Recipe App</div>
        </div>
        <div className='tabs'>
          <div className='left'>
            <h1 className={selectedTab === 'all' ? 'tab-active' : ''} onClick={() => setSelectedTab('all')}>All Recipes</h1>
            <h1 className={selectedTab === 'favorites' ? 'tab-active' : ''} onClick={() => setSelectedTab('favorites')}>Favorites</h1>
          </div>          
          <div className='right'>
            <button className={`create-recipe-btn ${selectedTab === 'createRecipe' ? 'tab-active' : ''}`} onClick={handleCreateRecipeTabClick}>
              {selectedTab === 'createRecipe' ? 'Back to Recipes' : 'Create Recipe'}
            </button>
          </div>
        </div>

        {/* if search tab is selected */}
        {selectedTab === 'createRecipe' ? (          
          <CreateRecipeForm createRecipe={createRecipe} isLoading={isLoading} />
          ) : (
          <>
            <input className='search-box' type='search' placeholder='search recipes' 
              onChange={handleSearchInputChange} 
            />
            
            {searchInput ? (
              <div className='recipe-grid'>
                {filteredRecipes.map((recipe: Recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      cardClickHandler={() => setSelectedRecipe(recipe)}
                      handleHeartClick={handleHeartClick}
                    />
                ))}
              </div>
              ) : (
              <div className='recipe-grid'>
                {displayRecipes.map((recipe: Recipe) => {
                  return (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      cardClickHandler={() => setSelectedRecipe(recipe)}
                      handleHeartClick={handleHeartClick}
                    />
                  );
                })}
              </div>
            )}

            <button className='view-more-btn' onClick={handleViewMoreClick}>
              View More
            </button>
          </>
        )}

        {/* if a recipe card is clicked the modal opens */}
        {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(undefined)} />}
      </div>
    </>
  );
};

export default App;
