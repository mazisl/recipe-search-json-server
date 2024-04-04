import { FormEvent, useEffect, useRef, useState } from 'react'
import './App.css'
import * as api from "./api";

import type { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { AiOutlineSearch } from 'react-icons/ai';

type Tabs = 'search' | 'favorites';

const App = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<Tabs>('search');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  const pageNumber = useRef(1);

  //we wanna fetch data when the app loads so using the useEffect hook
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favRecipes = await api.getFavoriteRecipes();
        setFavoriteRecipes(favRecipes.results);
      } catch (err) {
        console.log(err)
      }
    }

    fetchFavoriteRecipes();
  }, [])

  //now we set an eventHandler that will call our backend search endpoint when users hit enter
  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const recipes = await api.searchRecipes(searchTerm, 1)
      setRecipes(recipes.results)
      pageNumber.current = 1
    } catch (err) {
      console.log(err)
    }
  }

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage)
      setRecipes([...recipes, ...nextRecipes.results])
      pageNumber.current = nextPage
    } catch (err) {
      console.log(err)
    }

  }

  //empty heart click handler function
  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } catch (err) {
      console.log(err);
    }
  }

  //red heart click handler func
  const removeFavoriteRecipe = async (recipe: Recipe) => {

    try {
      await api.removeFavRecipe(recipe)
      const updatedRecipes = favoriteRecipes.filter((favRecipe) => {
        return recipe.id !== favRecipe.id
      })
      setFavoriteRecipes(updatedRecipes)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className='app-container'>
        <div className='header'>
          <img src='/hero-image.jpg' />
          <div className='title'>My Recipe App</div>
        </div>
        <div className='tabs'>
          <h1 className={selectedTab === 'search' ? 'tab-active' : ''} onClick={() => setSelectedTab('search')}>Recipe Search</h1>
          <h1 className={selectedTab === 'favorites' ? 'tab-active' : ''} onClick={() => setSelectedTab('favorites')}>Favorites</h1>
        </div>

        {/* if search tab is selected */}
        {selectedTab === 'search' && (
          <>
            <form onSubmit={(event) => handleSearchSubmit(event)}>
              <input 
                type='text' 
                required 
                placeholder='Enter search term...' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
              <button type='submit'><AiOutlineSearch size={40} /></button>
            </form>

            <div className='recipe-grid'>
              {recipes.map((recipe) => {
                const isFavorite = favoriteRecipes.some((favRecipe) => {
                  return recipe.id === favRecipe.id
                })
                return (
                  <RecipeCard
                    recipe={recipe}
                    cardClickHandler={() => setSelectedRecipe(recipe)}
                    onFavBtnClick={
                      isFavorite ? removeFavoriteRecipe : addFavoriteRecipe
                    } 
                    isFavorite={isFavorite}
                  />
                );
              })}
            </div>

            {/* {recipes.map((recipe) => {
              const isFavorite = favoriteRecipes.some((favRecipe) => {
                return recipe.id === favRecipe.id
              })
              return (
                <RecipeCard
                  recipe={recipe}
                  cardClickHandler={() => setSelectedRecipe(recipe)}
                  onFavBtnClick={
                    isFavorite ? removeFavoriteRecipe : addFavoriteRecipe
                  } 
                  isFavorite={isFavorite}
                />
              );
            })} */}
            <button className='view-more-btn' onClick={handleViewMoreClick}>
              View More
            </button>
          </>
        )}

        {/* moved above after starting to work on search and favs tabs */}
        {/* <form onSubmit={(event) => handleSearchSubmit(event)}>
          <input 
            type='text' 
            required 
            placeholder='Enter search term...' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >

          </input>
          <button type='submit'>Submit</button>
        </form>

        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} cardClickHandler={() => setSelectedRecipe(recipe)} />          
        ))}
        <button className='view-more-btn' onClick={handleViewMoreClick}>
          View More
        </button> */}

        {selectedTab === 'favorites' && (
          <div className='recipe-grid'>
            {favoriteRecipes.map((recipe) => (
              <RecipeCard 
                recipe={recipe} 
                cardClickHandler={() => setSelectedRecipe(recipe)}
                onFavBtnClick={removeFavoriteRecipe}
                isFavorite={true}
              />
            ))}
          </div>
        )}

        {selectedRecipe ? <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)} /> : null}
      </div>
    </>
  )
}

export default App;