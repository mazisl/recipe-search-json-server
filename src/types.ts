// export interface Recipe {
//   id: number;
//   title: string;
//   image: string;
//   imageType: string;
// }

export interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients: string;
  instructions: string;
  cuisine: string;
  isFavorite: boolean;
}

export interface RecipeSummary {
  id: number;
  title: string;
  summary: string;
}