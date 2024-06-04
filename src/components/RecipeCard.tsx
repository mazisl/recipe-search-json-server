import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { Recipe, Favorite } from "../types";

import { useUsers } from "../contexts/users.context";
import { useRecipes } from "../contexts/recipes.context";
import { Tooltip } from "./ui/tooltip";

interface RecipeCardProps {
  recipe: Recipe;
  cardClickHandler: () => void;
  isFavorite: boolean;
}

const RecipeCard = ({recipe, cardClickHandler, isFavorite }: RecipeCardProps) => {

  const {currentUser} = useUsers();
  const {toggleFavRecipe, showTooltip, setShowTooltip} = useRecipes();

  const favRecipe: Omit<Favorite, 'id'> = {
    userId: currentUser?.id,
    recipeId: recipe.id
  }

  return (
    <div className="recipe-card" onClick={cardClickHandler}>
      <img src={recipe.image}/>
      <div className="recipe-card-title">
        <Tooltip tooltip={showTooltip ? "Login to favorite recipes you love!" : ""}>
          <span onClick={(e) => {
            e.stopPropagation();
            if (!currentUser) {
              setShowTooltip(true);
              setTimeout(() => setShowTooltip(false), 3000);
              return;              
            }
            toggleFavRecipe(favRecipe)
          }}>
            {isFavorite ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} /> }
          </span>
        </Tooltip>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard;