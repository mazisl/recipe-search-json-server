import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as api from "./api";

import type { Recipe, Ingredient, IngredientToRecipe, User, Favorite } from './types';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { CreateRecipeForm } from './components/CreateRecipeForm';
import toast from 'react-hot-toast';

type ActiveBtn = null | 'register' | 'login';
type ActiveTab = 'all' | 'favorites' | 'createRecipe';

const App = () => {

  const [selectedBtn, setSelectedBtn] = useState<ActiveBtn>(null)
  const [searchInput, setSearchInput] = useState<string>('');
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [ingredientToRecipesList, setIngredientToRecipesList] = useState<IngredientToRecipe[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<ActiveTab>('all');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  //we need favoritesRecipes, setFavoriteRecipes, toggleFavRecipe from "FavoritesProvider"
  

  const pageNumber = useRef(1);

  const refetchRecipes = () => {
    setIsLoading(true);
    return api.getAllRecipes()
      .then((recipes) => setAllRecipes(recipes))
      .catch(() => toast.error('Failed to refetch recipes!'))
      .finally(() => setIsLoading(false))
  }

  const refetchUsers = () => {
    setIsLoading(true)
    return api.getAllUsers()
    .then((users) => setAllUsers(users))
    .catch(() => toast.error('Failed to refetch users!'))
    .finally(() => setIsLoading(false))
  }

  const refetchFavs = () => {
    setIsLoading(true);
    return api.getAllFavorites()
      .then((favs) => setFavoriteRecipes(favs))
      .catch(() => toast.error('Failed to refetch favorites!'))
      .finally(() => setIsLoading(false))
  }

  const refetchIngredientsList = () => {
    setIsLoading(true);
    return api.getIngredientsList()
      .then((ingredients) => setIngredientsList(ingredients))
      .catch(() => toast.error('Failed to refetch ingredients list!'))
      .finally(() => setIsLoading(false))
  }

  const refetchIngredientToRecipesList = () => {
    setIsLoading(true);
    return api.getIngredientToRecipes()
      .then((ingToRec) => setIngredientToRecipesList(ingToRec))
      .catch(() => toast.error('Failed to refetch ingredientToRecipes list!'))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    refetchRecipes();
    refetchUsers();
    refetchFavs();
    refetchIngredientsList();
    refetchIngredientToRecipesList();
  }, []);

  const createRecipe = (recipe: Omit<Recipe, 'id'>) => {
    setIsLoading(true);
    return api.postRecipe(recipe)
      .then(() => refetchRecipes())
      .then(() => toast.success('Thanks for creating a new recipe!'))
      .finally(() => setIsLoading(false))
  }

  const createIngredient = (ingredient: Omit<Ingredient, 'id'>) => {
    setIsLoading(true);
    return api.postIngredient(ingredient)      
    .then(() => refetchIngredientsList())
    .then(() => toast.success('Thanks for creating a new ingredient!'))
    .finally(() => setIsLoading(false))
  }

  const createIngredientToRecipe = (ingToRec: Omit<IngredientToRecipe, 'id'>) => {
    setIsLoading(true);
    return api.postIngredientToRecipe(ingToRec)
      .then(() => refetchIngredientToRecipesList())
      .then(() => toast.success('Thanks for creating a new ingredientToRecipe!'))
      .finally(() => setIsLoading(false))
  }

  // const createUser = (user: Omit<User, "id">): Promise<void> => {
  //   setIsLoading(true);

  //   Check if the username already exists in the list of allUsers
  //   const existingUser = allUsers.find((u) => u.username === user.username);

  //   if (existingUser) {
  //     toast.error('User already exists, try a different username!');
  //     setIsLoading(false);
  //     return;
  //   }

  //   return api.postUser(user)
  //     .then(() => refetchUsers())
  //     .then(() => toast.success('User created successfully!'))
  //     .finally(() => setIsLoading(false))
  // }

  const createUser = async (user: Omit<User, "id">): Promise<void> => {
    setIsLoading(true);
  
    try {
      // Check if the username already exists in the list of allUsers
      const existingUser = allUsers.find((u) => u.username === user.username);
  
      if (existingUser) {
        toast.error('User already exists, try a different username!');
        setIsLoading(false);
        return;
      }
  
      await api.postUser(user);
      await refetchUsers();
      toast.success('User created successfully!');
    } catch (error) {
      toast.error('Failed to create user.');
    } finally {
      setIsLoading(false);
    }
  }
  
  const toggleFavRecipe = (favRecipe: Omit<Favorite, 'id'>) => {
    return api.toggleFavorite(favRecipe)
      .then(() => refetchFavs())
  }

  const handleCreateRecipeTabClick = () => {
    if (!currentUser) {
      toast.error('Login to create recipe!');
      return;              
    }
    setSelectedTab(prevTab => prevTab === 'createRecipe' ? 'all' : 'createRecipe');
  };

  const login = (username: string, password: string) => {    
    setIsLoading(true);
    const user = allUsers.find((user) => user.username === username);
  
    if (!user) {
      toast.error('User not found');
      setIsLoading(false);
      return;
    }
  
    if (user.password !== password) {
      toast.error('Incorrect password');
      setIsLoading(false);
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  
    // If both username and password match
    toast.success('Logged in!');
    setIsLoading(false);
    setSelectedBtn(null);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  }

  //here we segregate fav recipes list from all recipes list for displaying the list on frontend depending on the selected tab
  // const favoriteRecipesList = allRecipes.filter((recipe) => recipe.isFavorite);
  const favIdsArr = favoriteRecipes?.map((favorite: Favorite) => {
    if (favorite.userId === currentUser?.id) return favorite.recipeId
  })

  const favoriteRecipesList = allRecipes.filter((recipe) => {
    return favIdsArr.includes(recipe.id);
  });

  const recipesList = {
    all: allRecipes,
    favorites: favoriteRecipesList
  }

  const displayRecipes = recipesList[selectedTab];

  //this is the list of recipes we want to display when a user types something in the search input field
  //we handle the scenario that displayRecipes array could be empty so we don't get any error
  const filteredRecipes = (displayRecipes || []).filter((recipe: Recipe) => recipe.title.toLowerCase().includes(searchInput));

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputString = e.target.value.toLowerCase();
    setSearchInput(searchInputString)
  }

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
        {currentUser ? (
          <div className='logout-btn-div'>
            <h3>{`Welcome ${currentUser.username}!`}</h3>
            <button className='logout-btn' onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className='register-and-login-btns'>
            <button className='register-btn' onClick={() => setSelectedBtn('register')}>Register</button>
            <button className='login-btn' onClick={() => setSelectedBtn('login')}>Login</button>
          </div>
        )}
        <div className='header'>
          <img src='/hero-image.jpg' alt='Hero' />
          <div className='title'>Foodie App</div>
        </div>
        <div className='tabs'>
          <div className='left'>
            <h1 className={selectedTab === 'all' ? 'tab-active' : ''} onClick={() => setSelectedTab('all')}>All Recipes</h1>
            <h1 className={selectedTab === 'favorites' ? 'tab-active' : ''} 
              onClick={() => {
              if (!currentUser) {
                toast.error('Login to view favorites!');
                return;              
              }
              setSelectedTab('favorites')
            }}>Favorites</h1>
          </div>          
          <div className='right'>
            <button className={`create-recipe-btn ${selectedTab === 'createRecipe' ? 'tab-active' : ''}`} onClick={handleCreateRecipeTabClick}>
              {selectedTab === 'createRecipe' ? 'Back to Recipes' : 'Create Recipe'}
            </button>
          </div>
        </div>

        {selectedBtn === 'register' && <RegisterForm createUser={createUser} isLoading={isLoading} onClose={() => setSelectedBtn(null)} />}
        {selectedBtn === 'login' && <LoginForm login={login} isLoading={isLoading} onClose={() => setSelectedBtn(null)} />}

        {/* if search tab is selected */}
        {selectedTab === 'createRecipe' ? (          
          <CreateRecipeForm allRecipes={allRecipes} ingredientsList={ingredientsList} createRecipe={createRecipe} createIngredient={createIngredient} createIngredientToRecipe={createIngredientToRecipe} isLoading={isLoading} />
          ) : (
          <>
            <input className='search-box' type='search' placeholder='search recipes' 
              onChange={handleSearchInputChange} 
            />
            
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
