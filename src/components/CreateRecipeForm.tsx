import { useState } from "react";
import type { Recipe, Ingredient, IngredientToRecipe } from "../types"
import toast from "react-hot-toast";
// import * as api from './../api';

interface CreateRecipeFormProps {
  allRecipes: Recipe[];
  ingredientsList: Ingredient[];
  createRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<unknown>;
  createIngredient: (ingredient: Omit<Ingredient, 'id'>) => Promise<unknown>;
  createIngredientToRecipe: (ingToRec: Omit<IngredientToRecipe, 'id'>) => Promise<unknown>
  isLoading: boolean;
}

const cuisineArr = ['Italian', 'Asian', 'Mexican', 'American', 'Thai', 'Indian', 'Japanese', 'Russian', 'Spanish', 'Lebanese', 'Arabic', 'Mediterranian', 'Continental', 'Other']

export const CreateRecipeForm = ({allRecipes, ingredientsList, createRecipe, createIngredient, createIngredientToRecipe, isLoading}: CreateRecipeFormProps) => {

  const [nameInput, setNameInput] = useState<string>('');
  const [ingredientsInput, setIngredientsInput] = useState<string>('');
  const [instructionsInput, setInstructionsInput] = useState<string>('');
  const [imageInput, setImageInput] = useState<string>('');
  const [cuisineInput, setCuisineInput] = useState<string>(cuisineArr[0]);  

  // useEffect(() => {
  //   console.log('effect fired')
  //   console.log('All Recipes:', allRecipes)
  //   console.log('Ingredients List:', ingredientsList)
  // }, [allRecipes, ingredientsList]);

  const splitIngredients = (ingredientsInput: string): string[] => {
    const trimmedInput = ingredientsInput.trim();
    const array = trimmedInput.split(',').map((ingredient) => ingredient.trim());
    const filteredArray = array.filter((ingredient) => ingredient.length > 0);
    return filteredArray;
  };

  let ingredientsArray: string[] = [];

  console.log(ingredientsArray);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //create recipe first
      await createRecipe({
        title: nameInput,
        image: imageInput,
        ingredients: ingredientsInput,
        instructions: instructionsInput,
        cuisine: cuisineInput,
        isFavorite: false
      })

      toast.success('Recipe created successfully')

      //split ingredients after recipe is created
      ingredientsArray = splitIngredients(ingredientsInput);  
      console.log(ingredientsArray);

      //take ingredients from ingredientsInput and create new ingredients in the ingredients endpoint for all the ingredients that don't already exist
      //ingredientsArray contain the ingredients from ingredientsInput
      //ingredientsList contain ingredients stored in ingredients data type in json.db
      const ingredientPromises = ingredientsArray.map((ingItem) => {
        const existingIngredient = ingredientsList.find((ingredient) => ingredient.title === ingItem);
  
        if (!existingIngredient) {
          const newIngredient: Omit<Ingredient, 'id'> = {
             title: ingItem 
            };
          return createIngredient(newIngredient)
            .catch(() => toast.error('Could not create ingredient!'));
        }
        return Promise.resolve();
      });
  
      // Wait for all ingredient creation promises to resolve
      await Promise.all(ingredientPromises);
  
  
      // Create ingredientToRecipe entries for each ingredient entered inside ingredientsInput  
      const updatedIngredientsList = [...ingredientsList];

      const ingredientToRecipePromises = ingredientsArray.map((ingItem) => {
        const newIngredient = updatedIngredientsList.find((ingredient) => ingredient.title === ingItem);
  
        if (newIngredient) {
          const ingredientToRecipe = {
            ingredientId: newIngredient.id,
            recipeId: allRecipes[allRecipes.length - 1].id,
          };
          return createIngredientToRecipe(ingredientToRecipe).catch(() => toast.error('Could not create ingredientToRecipe!'));
        }
        return Promise.resolve();
      });
  
      await Promise.all(ingredientToRecipePromises);
      
      //clear form inputs      
      setNameInput('');
      setIngredientsInput('');
      setInstructionsInput('');
      setImageInput('');
      setCuisineInput(cuisineArr[0]);

    } catch (error) {
      toast.error('Could not create recipe!')
    }
  }

  return (
    <form
      action=""
      id="create-recipe-form"
      onSubmit={handleSubmit}
    >

      <h4>Create a new recipe!</h4>

      <label htmlFor="name">Recipe Name:</label>
      <input
        id="name"
        type="text"
        placeholder="enter recipe name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        disabled={isLoading} 
      />

      <label htmlFor="ingredients">Ingredients:</label>
      <input
        id="ingredients"
        type="text"
        placeholder="enter ingredients separated by comma"
        value={ingredientsInput}
        onChange={(e) => setIngredientsInput(e.target.value)}
        disabled={isLoading} 
      />

      <label htmlFor="instructions">Prep Instructions:</label>
      <textarea
        id="instructions"
        placeholder="enter preparation instructions"
        value={instructionsInput}
        onChange={(e) => setInstructionsInput(e.target.value)}
        cols={80}
        rows={10}
        disabled={isLoading} 
      ></textarea>

      <label htmlFor="image">Recipe Image</label>
      <input
        id="image"
        type="text"
        placeholder="enter image url"
        value={imageInput}
        onChange={(e) => setImageInput(e.target.value)}
        disabled={isLoading} 
      />

      <label htmlFor="cuisine">Select a Cuisine</label>
      <select id="cuisine" onChange={(e) => setCuisineInput(e.target.value)} disabled={isLoading}>
      {cuisineArr.map((cuisine) => (
        <option key={cuisine} value={cuisine}>
          {cuisine}
        </option>
        ))}
      </select>

      <input type="submit" disabled={isLoading}/>

    </form>
  )
}