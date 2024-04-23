import { Recipe } from "../types";
import ModalOverlay from "./ModalOverlay";

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeModal = ({recipe, onClose}: RecipeModalProps) => {

  if (!recipe) {
    return <></>
  }

  return (
    <>
      <ModalOverlay onClose={onClose} />
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipe?.title}</h2>
            <span className="close-btn" onClick={onClose}>&times;</span>
          </div>
          <p>{recipe?.instructions}</p>
        </div>
      </div>
    </>
  )
}

export default RecipeModal;