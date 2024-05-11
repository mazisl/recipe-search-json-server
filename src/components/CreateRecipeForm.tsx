import { useState } from "react";
import type { Recipe, Ingredient } from "../types"
import toast from "react-hot-toast";
// import * as api from './../api';

interface CreateRecipeFormProps {
  ingredientsList: Ingredient[],
  createRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<unknown>;
  createIngredient: (ingredient: Omit<Ingredient, 'id'>) => Promise<unknown>;
  isLoading: boolean;
}

const cuisineArr = ['Italian', 'Asian', 'Mexican', 'American', 'Thai', 'Indian', 'Japanese', 'Russian', 'Spanish', 'Lebanese', 'Arabic', 'Mediterranian', 'Continental', 'Other']

export const CreateRecipeForm = ({ingredientsList, createRecipe, createIngredient, isLoading}: CreateRecipeFormProps) => {

  const [nameInput, setNameInput] = useState<string>('');
  const [ingredientsInput, setIngredientsInput] = useState<string>('');
  const [instructionsInput, setInstructionsInput] = useState<string>('');
  const [imageInput, setImageInput] = useState<string>('');
  const [cuisineInput, setCuisineInput] = useState<string>(cuisineArr[0]);

  const splitIngredients = (ingredientsInput: string): string[] => {
    const trimmedInput = ingredientsInput.trim();
    const array = trimmedInput.split(',').map((ingredient) => ingredient.trim());
    const filteredArray = array.filter((ingredient) => ingredient.length > 0);
    return filteredArray;
  };

  let ingredientsArray: string[] = [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    ingredientsArray = splitIngredients(ingredientsInput);

    const promises: Promise<unknown>[] = [];

    for (const ingItem of ingredientsArray) {
      const existingIngredient = ingredientsList.find((ingredient) => ingredient.title === ingItem);

      if (!existingIngredient) {
        const newIngredient: Omit<Ingredient, 'id'> = {
          title: ingItem,
          // Add other properties for the new ingredient if needed
        };

        promises.push(createIngredient(newIngredient));
      }
    }

    await Promise.all(promises);

    try {
      await createRecipe({
        title: nameInput,
        image: imageInput,
        ingredients: ingredientsInput,
        instructions: instructionsInput,
        cuisine: cuisineInput,
        isFavorite: false
      });

      // Reset form inputs after successful submission
      setNameInput('');
      setIngredientsInput('');
      setInstructionsInput('');
      setImageInput('');
      setCuisineInput(cuisineArr[0]);

      // Reset ingredientsArray after resetting ingredientsInput
      ingredientsArray = [];

      // Show success message using toast
      toast.success('Recipe created successfully!');
    } catch (error) {
      toast.error('Could not create new recipe!');
    }
  };
  

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
        placeholder="search by name or cuisine"
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