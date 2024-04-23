import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  cardClickHandler: () => void;
  handleHeartClick: (recipe: Recipe, isFavorite: boolean) => void;
}

const RecipeCard = ({recipe, cardClickHandler, handleHeartClick}: RecipeCardProps) => {

  const onEmptyHeartClick = (recipe: Recipe) => {
    handleHeartClick(recipe, true)
  }

  const onHeartClick = (recipe: Recipe) => {
    handleHeartClick(recipe, false);
  }

  return (
    <div className="recipe-card" onClick={cardClickHandler}>
      <img src={recipe.image}/>
      <div className="recipe-card-title">
        <span onClick={(e) => {
          e.stopPropagation();
        }}>
          {recipe.isFavorite ? <AiFillHeart size={25} color="red" onClick={() => onHeartClick(recipe)}/> : <AiOutlineHeart size={25} onClick={() => onEmptyHeartClick(recipe)}/> }
          {/* <AiOutlineHeart /> */}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard;