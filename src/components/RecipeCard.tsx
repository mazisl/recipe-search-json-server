import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { Recipe, User, Favorite } from "../types";
import toast from "react-hot-toast";

interface RecipeCardProps {
  recipe: Recipe;
  cardClickHandler: () => void;
  isFavorite: boolean;
  currentUser: User | null;
  toggleFavRecipe: (favRecipe: Favorite) => Promise<string | void>
}

const RecipeCard = ({recipe, cardClickHandler, isFavorite, currentUser, toggleFavRecipe}: RecipeCardProps) => {

  const favRecipe: Omit<Favorite, 'id'> = {
    userId: currentUser?.id,
    recipeId: recipe.id
  }

  return (
    <div className="recipe-card" onClick={cardClickHandler}>
      <img src={recipe.image}/>
      <div className="recipe-card-title">
        <span onClick={(e) => {
          e.stopPropagation();
          if (!currentUser) {
            toast.error('Login to create favorites!');
            return;              
          }
          toggleFavRecipe(favRecipe)
        }}>
          {isFavorite ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} /> }
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard;