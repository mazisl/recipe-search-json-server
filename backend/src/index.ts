import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {PrismaClient} from '@prisma/client'

import * as RecipeAPI from './recipe-api'
//this way of importing allows us to import everything from recipe-api.ts and access them as objects via RecipeAPI

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());

app.use(cors());

app.get("/api/recipes/search", async (req, res) => {

  // return res.json({message: 'success'})
  
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);

  return res.json(results);

});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  
  const recipeId = req.params.recipeId;
  const results = await RecipeAPI.getRecipeSummary(recipeId);

  return res.json(results);

});

app.post("/api/recipes/favorite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    const favoriteRecipe = await prismaClient.favoriteRecipes.create({
      data: {
        recipeId: recipeId
      }
    })
    //status of 201 means post created successfully
    return res.status(201).json(favoriteRecipe)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: "Oops, something went wrong!"})
  }
})

//retrieve recipes from db
app.get("/api/recipes/favorite", async (req, res) => {

  try {

    //we go to favoriteRecipes table in our db and assign the table to recipes var
    const recipes = await prismaClient.favoriteRecipes.findMany();

    //store recipe ids in an array as strings
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());

    //now that we hav this fav ids array we shd call recipe site api to return the recipes that match the ids
    //we do this inside recipe-api.ts as always

    const favorites = await RecipeAPI.getFavoriteRecipesByIDs(recipeIds);

    //return favs back to frontend
    return res.json(favorites);

  } catch (err) {
    console.log(err)
    return res.status(500).json({error: "Oops, could not get favs!"})
  }
})

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});

//create delete endpoint
app.delete("/api/recipes/favorite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    await prismaClient.favoriteRecipes.delete({
      where: {
        recipeId: recipeId,
      },
    });
    //status of 204 means sth was deleted
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
});