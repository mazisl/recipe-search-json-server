import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import * as api from "../api";

import type { Recipe, Ingredient, IngredientToRecipe, Favorite } from '../types'
import { useUsers } from "./users.context";

type ActiveTab = 'all' | 'favorites' | 'createRecipe';

type TRecipesProvider = {
  allRecipes: Recipe[],
  searchInput: string,
  ingredientsList: Ingredient[],
  ingredientToRecipesList: IngredientToRecipe[],
  selectedTab: ActiveTab,
  setSelectedTab: (tab: ActiveTab) => void,
  favoriteRecipes: Favorite[],
  createRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<unknown>,
  createIngredient: (ingredient: Omit<Ingredient, 'id'>) => Promise<unknown>,
  createIngredientToRecipe: (ingToRec: Omit<IngredientToRecipe, 'id'>) => Promise<unknown>,
  displayRecipes: Recipe[],
  filteredRecipes: Recipe[],
  toggleFavRecipe: (favRecipe: Omit<Favorite, 'id'>) => Promise<string | void>;
  handleCreateRecipeTabClick: () => void;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showTooltip: boolean;
  setShowTooltip: (value: boolean) => void;
}

const RecipesContext = createContext<TRecipesProvider>({} as TRecipesProvider);

export const RecipesProvider = ({children}: {children: ReactNode}) => {

  const {currentUser, setIsLoading} = useUsers();

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [ingredientToRecipesList, setIngredientToRecipesList] = useState<IngredientToRecipe[]>([]);
  const [selectedTab, setSelectedTab] = useState<ActiveTab>('all');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorite[]>([]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const refetchRecipes = () => {
    setIsLoading(true);
    return api.getAllRecipes()
      .then((recipes) => setAllRecipes(recipes))
      .catch(() => toast.error('Failed to refetch recipes!'))
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

  console.log(ingredientToRecipesList);
  
  const toggleFavRecipe = (favRecipe: Omit<Favorite, 'id'>) => {
    return api.toggleFavorite(favRecipe)
      .then(() => refetchFavs())
  }

  const handleCreateRecipeTabClick = () => {
    if (!currentUser) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;              
    }
    setSelectedTab(prevTab => prevTab === 'createRecipe' ? 'all' : 'createRecipe');
  };

  //here we segregate fav recipes list from all recipes list for displaying the list on frontend depending on the selected tab
  // const favoriteRecipesList = allRecipes.filter((recipe) => recipe.isFavorite);
  const favIdsArr = favoriteRecipes?.map((favorite: Favorite) => {
    if (favorite.userId === currentUser?.id) return favorite.recipeId
  })

  const favoriteRecipesList = allRecipes.filter((recipe) => {
    return favIdsArr.includes(recipe.id);
  });

  // const recipesList = {
  //   all: allRecipes,
  //   favorites: favoriteRecipesList
  // }

  //alternative code to get rid of the annoying type error
  const recipesList: { [key in ActiveTab]: Recipe[] } = {
    all: allRecipes,
    favorites: favoriteRecipesList,
    createRecipe: [] // Assuming this tab would have an empty list initially
  };

  const displayRecipes = recipesList[selectedTab];

  //this is the list of recipes we want to display when a user types something in the search input field
  //we handle the scenario that displayRecipes array could be empty so we don't get any error
  const filteredRecipes = (displayRecipes || []).filter((recipe: Recipe) => recipe.title.toLowerCase().includes(searchInput));

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputString = e.target.value.toLowerCase();
    setSearchInput(searchInputString)
  }

  const value = {
    allRecipes,
    searchInput,
    ingredientsList,
    ingredientToRecipesList,
    selectedTab,
    setSelectedTab,
    favoriteRecipes,
    createRecipe,
    createIngredient,
    createIngredientToRecipe,
    displayRecipes,
    filteredRecipes,
    toggleFavRecipe,
    handleCreateRecipeTabClick,
    handleSearchInputChange,
    showTooltip,
    setShowTooltip
  }
  

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipesContext);