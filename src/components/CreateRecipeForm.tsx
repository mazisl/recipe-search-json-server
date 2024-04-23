import { useState } from "react";
import type { Recipe } from "../types"
import toast from "react-hot-toast";

interface CreateRecipeFormProps {
  createRecipe: (recipe: Omit<Recipe, "id">) => Promise<unknown>;
  isLoading: boolean;
}

const cuisineArr = ['Italian', 'Asian', 'Mexican', 'American', 'Thai', 'Indian', 'Japanese', 'Russian', 'Spanish', 'Lebanese', 'Arabic', 'Mediterranian', 'Continental', 'Other']

export const CreateRecipeForm = ({createRecipe, isLoading}: CreateRecipeFormProps) => {

  const [nameInput, setNameInput] = useState<string>('');
  const [ingredientsInput, setIngredientsInput] = useState<string>('');
  const [instructionsInput, setInstructionsInput] = useState<string>('');
  const [imageInput, setImageInput] = useState<string>('');
  const [cuisineInput, setCuisineInput] = useState<string>(cuisineArr[0]);

  return (
    <form
      action=""
      id="create-recipe-form"
      onSubmit={(e) => {
        e.preventDefault();
        createRecipe({
          title: nameInput,
          image: imageInput,
          ingredients: ingredientsInput,
          instructions: instructionsInput,
          cuisine: cuisineInput,
          isFavorite: false
        }).then(() => {
          setNameInput('')
          setIngredientsInput('')
          setInstructionsInput('')
          setImageInput('')
          setCuisineInput(cuisineArr[0])
        })
        .catch(() => toast.error('Could not create new recipe!'))
      }}
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