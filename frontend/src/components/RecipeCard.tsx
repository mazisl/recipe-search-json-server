import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  cardClickHandler: () => void;
  onFavBtnClick: (recipe: Recipe) => void;
  isFavorite: boolean
}

const RecipeCard = ({recipe, cardClickHandler, onFavBtnClick, isFavorite}: RecipeCardProps) => {

  return (
    <div className="recipe-card" onClick={cardClickHandler}>
      <img src={recipe.image}/>
      <div className="recipe-card-title">
        <span onClick={(e) => {
          e.stopPropagation();
          onFavBtnClick(recipe);
        }}>
          {isFavorite ? <AiFillHeart size={25} color="red"/> : <AiOutlineHeart size={25}/> }
          {/* <AiOutlineHeart /> */}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard;