import { writeFileSync } from "fs";

const db = {
    "recipes": [
      {
        "id": "1",
        "title": "Chicken Stir-Fry",
        "image": "https://www.kitchensanctuary.com/wp-content/uploads/2016/03/Quick-Chicken-Stir-Fry-wide-FS-60.jpg",
        "ingredients": "chicken breast, bell peppers, soy sauce, rice",
        "instructions": "Stir-fry chicken and vegetables; add soy sauce; serve with rice.",
        "cuisine": "Asian"
      },
      {
        "id": "2",
        "title": "Classic Margherita Pizza",
        "ingredients": "pizza dough, tomato sauce, fresh mozzarella, fresh basil, olive oil",
        "instructions": "Roll out pizza dough; spread tomato sauce; top with sliced mozzarella and basil; bake until crust is golden.",
        "image": "https://imagevars.gulfnews.com/2023/09/04/Magherita-pizza-_18a6007a47a_medium.jpg",
        "cuisine": "Italian"
      },
      {
        "id": "3",
        "title": "Beef Tacos",
        "ingredients": "ground beef, taco seasoning, tortillas, lettuce, tomato, cheese, sour cream",
        "instructions": "Brown ground beef with taco seasoning; assemble tacos with desired toppings.",
        "image": "https://img.taste.com.au/Z2m_6zIt/taste/2016/11/beef-tacos-98153-1.jpeg",
        "cuisine": "Mexican"
      },
      {
        "id": "4",
        "title": "Chicken Alfredo Pasta",
        "ingredients": "chicken breast, fettuccine pasta, heavy cream, parmesan cheese, butter, garlic",
        "instructions": "Cook pasta; sauté chicken and garlic; add cream and parmesan; toss with cooked pasta.",
        "image": "https://dinnerthendessert.com/wp-content/uploads/2021/05/Chicken-Alfredo-Pasta-1x1-1.jpg",
        "cuisine": "Italian"
      },
      {
        "id": "5",
        "title": "BBQ Pulled Beef Sandwich",
        "ingredients": "beef shoulder, BBQ sauce, hamburger buns, coleslaw",
        "instructions": "Slow-cook beef with BBQ sauce until tender; shred and serve on buns with coleslaw.",
        "image": "https://www.tasteguru.com/wp-content/uploads/Slow-Cooker-Pulled-BBQ-Beef-Sandwiches-3.jpg",
        "cuisine": "American"
      },
      {
        "id": "6",
        "title": "Beef Burger",
        "ingredients": "ground beef, hamburger buns, lettuce, tomato, onion, cheese, ketchup, mustard",
        "instructions": "Form beef into patties; grill to desired doneness; assemble burgers with toppings and condiments.",
        "image": "https://food-images.files.bbci.co.uk/food/recipes/spicybeefburger_71357_16x9.jpg",
        "cuisine": "American"
      },
      {
        "id": "7",
        "title": "Lemon Garlic Shrimp Scampi",
        "ingredients": "shrimp, linguine pasta, garlic, lemon, butter, white wine, parsley",
        "instructions": "Sauté shrimp and garlic in butter; add lemon juice and wine; toss with cooked pasta and parsley.",
        "image": "https://www.daringgourmet.com/wp-content/uploads/2014/09/Campbells-Scampi-4-edited.jpg",
        "cuisine": "Italian"
      },
      {
        "id": "8",
        "title": "Chicken Tikka Masala",
        "ingredients": "chicken thighs, yogurt, tomato sauce, onion, garlic, ginger, garam masala",
        "instructions": "Marinate chicken in yogurt and spices; grill or sauté; simmer in tomato sauce with onions and spices.",
        "image": "https://www.supergoldenbakes.com/wordpress/wp-content/uploads/2023/09/Air_Fryer_Chicken_Tikka_Masala-500x500.jpg",
        "cuisine": "Indian"
      },
      {
        "id": "9",
        "title": "Shish Taouk (Lebanese Chicken Kebabs)",
        "ingredients": "chicken breast, garlic cloves, lemon juice, plain yogurt, olive oil, paprika, cumin, turmeric, cayenne pepper, salt,    black pepper, red onion (for skewers), bell peppers",
        "instructions": "1. Cut chicken breast into bite-sized cubes.\n2. In a bowl, mix minced garlic, lemon juice, yogurt, olive oil, paprika, cumin, turmeric, cayenne pepper, salt, and black pepper to make the marinade.\n3. Add chicken cubes to the marinade and coat evenly. Cover and refrigerate for at least 2 hours (preferably overnight) to marinate.\n4. Preheat grill to medium-high heat.\n5. Thread marinated chicken cubes onto skewers, alternating with pieces of red onion and bell peppers if desired.\n6. Grill kebabs for about 10-12 minutes, turning occasionally, until chicken is cooked through and slightly charred.\n7. Serve hot with rice or pita bread and a side of garlic sauce or tahini sauce.",
        "image": "https://tastegreatfoodie.com/wp-content/uploads/2022/09/Shish-Tawook-Recipe-e1662340981256.jpeg",
        "cuisine": "Lebanese"
      },
      {
        "id": "10",
        "title": "Pad Thai",
        "ingredients": "rice noodles, shrimp, tofu, bean sprouts, green onions, peanuts, tamarind sauce",
        "instructions": "Soak noodles; stir-fry shrimp, tofu, and vegetables; toss with noodles, sauce, and peanuts.",
        "image": "https://www.chilipeppermadness.com/wp-content/uploads/2022/03/Pad-Thai-SQ.jpg",
        "cuisine": "Thai"
      }
    ],
    "ingredients": [
      {
        "id": "1",
        "title": "chicken breast"
      },
      {
        "id": "2",
        "title": "bell peppers"
      },
      {
        "id": "3",
        "title": "soy sauce"
      },
      {
        "id": "4",
        "title": "rice"
      },
      {
        "id": "5",
        "title": "pizza dough"
      },
      {
        "id": "6",
        "title": "tomato sauce"
      },
      {
        "id": "7",
        "title": "fresh mozzarella"
      },
      {
        "id": "8",
        "title": "fresh basil"
      },
      {
        "id": "9",
        "title": "olive oil"
      },
      {
        "id": "10",
        "title": "ground beef"
      },
      {
        "id": "11",
        "title": "taco seasoning"
      },
      {
        "id": "12",
        "title": "tortillas"
      },
      {
        "id": "13",
        "title": "lettuce"
      },
      {
        "id": "14",
        "title": "tomato"
      },
      {
        "id": "15",
        "title": "cheese"
      },
      {
        "id": "16",
        "title": "sour cream"
      },
      {
        "id": "17",
        "title": "fettuccine pasta"
      },
      {
        "id": "18",
        "title": "heavy cream"
      },
      {
        "id": "19",
        "title": "parmesan cheese"
      },
      {
        "id": "20",
        "title": "butter"
      },
      {
        "id": "21",
        "title": "garlic"
      },
      {
        "id": "22",
        "title": "beef shoulder"
      },
      {
        "id": "23",
        "title": "BBQ sauce"
      },
      {
        "id": "24",
        "title": "hamburger buns"
      },
      {
        "id": "25",
        "title": "coleslaw"
      },
      {
        "id": "26",
        "title": "linguine pasta"
      },
      {
        "id": "27",
        "title": "lemon"
      },
      {
        "id": "28",
        "title": "white wine"
      },
      {
        "id": "29",
        "title": "parsley"
      },
      {
        "id": "30",
        "title": "chicken thighs"
      },
      {
        "id": "31",
        "title": "yogurt"
      },
      {
        "id": "32",
        "title": "onion"
      },
      {
        "id": "33",
        "title": "ginger"
      },
      {
        "id": "34",
        "title": "garam masala"
      },
      {
        "id": "35",
        "title": "garlic cloves"
      },
      {
        "id": "36",
        "title": "lemon juice"
      },
      {
        "id": "37",
        "title": "plain yogurt"
      },
      {
        "id": "38",
        "title": "paprika"
      },
      {
        "id": "39",
        "title": "cumin"
      },
      {
        "id": "40",
        "title": "turmeric"
      },
      {
        "id": "41",
        "title": "cayenne pepper"
      },
      {
        "id": "42",
        "title": "salt"
      },
      {
        "id": "43",
        "title": "black pepper"
      },
      {
        "id": "44",
        "title": "red onion (for skewers)"
      },
      {
        "id": "45",
        "title": "rice noodles"
      },
      {
        "id": "46",
        "title": "shrimp"
      },
      {
        "id": "47",
        "title": "tofu"
      },
      {
        "id": "48",
        "title": "bean sprouts"
      },
      {
        "id": "49",
        "title": "green onions"
      },
      {
        "id": "50",
        "title": "peanuts"
      },
      {
        "id": "51",
        "title": "tamarind sauce"
      }
    ],
    "ingredientToRecipes": [
      {
        "id": "1",
        "ingredientId": "1",
        "recipeId": "1"
      },
      {
        "id": "2",
        "ingredientId": "1",
        "recipeId": "4"
      },
      {
        "id": "3",
        "ingredientId": "1",
        "recipeId": "9"
      },
      {
        "id": "4",
        "ingredientId": "2",
        "recipeId": "1"
      },
      {
        "id": "5",
        "ingredientId": "2",
        "recipeId": "9"
      },
      {
        "id": "6",
        "ingredientId": "3",
        "recipeId": "1"
      },
      {
        "id": "7",
        "ingredientId": "4",
        "recipeId": "1"
      },
      {
        "id": "8",
        "ingredientId": "5",
        "recipeId": "2"
      },
      {
        "id": "9",
        "ingredientId": "6",
        "recipeId": "2"
      },
      {
        "id": "10",
        "ingredientId": "7",
        "recipeId": "2"
      },
      {
        "id": "11",
        "ingredientId": "8",
        "recipeId": "2"
      },
      {
        "id": "12",
        "ingredientId": "9",
        "recipeId": "2"
      },
      {
        "id": "13",
        "ingredientId": "9",
        "recipeId": "9"
      },
      {
        "id": "14",
        "ingredientId": "10",
        "recipeId": "3"
      },
      {
        "id": "15",
        "ingredientId": "10",
        "recipeId": "6"
      },
      {
        "id": "16",
        "ingredientId": "11",
        "recipeId": "3"
      },
      {
        "id": "17",
        "ingredientId": "12",
        "recipeId": "3"
      },
      {
        "id": "18",
        "ingredientId": "13",
        "recipeId": "3"
      },
      {
        "id": "19",
        "ingredientId": "13",
        "recipeId": "6"
      },
      {
        "id": "20",
        "ingredientId": "14",
        "recipeId": "3"
      },
      {
        "id": "21",
        "ingredientId": "14",
        "recipeId": "6"
      },
      {
        "id": "22",
        "ingredientId": "15",
        "recipeId": "3"
      },
      {
        "id": "23",
        "ingredientId": "16",
        "recipeId": "3"
      },
      {
        "id": "24",
        "ingredientId": "16",
        "recipeId": "8"
      },
      {
        "id": "25",
        "ingredientId": "17",
        "recipeId": "4"
      },
      {
        "id": "26",
        "ingredientId": "18",
        "recipeId": "4"
      },
      {
        "id": "27",
        "ingredientId": "19",
        "recipeId": "4"
      },
      {
        "id": "28",
        "ingredientId": "20",
        "recipeId": "4"
      },
      {
        "id": "29",
        "ingredientId": "21",
        "recipeId": "4"
      },
      {
        "id": "30",
        "ingredientId": "22",
        "recipeId": "5"
      },
      {
        "id": "31",
        "ingredientId": "23",
        "recipeId": "5"
      },
      {
        "id": "32",
        "ingredientId": "24",
        "recipeId": "5"
      },
      {
        "id": "33",
        "ingredientId": "25",
        "recipeId": "5"
      },
      {
        "id": "34",
        "ingredientId": "24",
        "recipeId": "6"
      },
      {
        "id": "35",
        "ingredientId": "13",
        "recipeId": "6"
      },
      {
        "id": "36",
        "ingredientId": "14",
        "recipeId": "6"
      },
      {
        "id": "37",
        "ingredientId": "16",
        "recipeId": "6"
      },
      {
        "id": "38",
        "ingredientId": "26",
        "recipeId": "7"
      },
      {
        "id": "39",
        "ingredientId": "27",
        "recipeId": "7"
      },
      {
        "id": "40",
        "ingredientId": "21",
        "recipeId": "7"
      },
      {
        "id": "41",
        "ingredientId": "28",
        "recipeId": "7"
      },
      {
        "id": "42",
        "ingredientId": "29",
        "recipeId": "7"
      },
      {
        "id": "43",
        "ingredientId": "30",
        "recipeId": "8"
      },
      {
        "id": "44",
        "ingredientId": "31",
        "recipeId": "8"
      },
      {
        "id": "45",
        "ingredientId": "32",
        "recipeId": "8"
      },
      {
        "id": "46",
        "ingredientId": "39",
        "recipeId": "9"
      },
      {
        "id": "47",
        "ingredientId": "40",
        "recipeId": "9"
      },
      {
        "id": "48",
        "ingredientId": "41",
        "recipeId": "9"
      },
      {
        "id": "49",
        "ingredientId": "42",
        "recipeId": "9"
      },
      {
        "id": "50",
        "ingredientId": "43",
        "recipeId": "9"
      },
      {
        "id": "51",
        "ingredientId": "44",
        "recipeId": "9"
      },
      {
        "id": "52",
        "ingredientId": "45",
        "recipeId": "9"
      },
      {
        "id": "53",
        "ingredientId": "46",
        "recipeId": "9"
      },
      {
        "id": "54",
        "ingredientId": "47",
        "recipeId": "10"
      },
      {
        "id": "55",
        "ingredientId": "48",
        "recipeId": "10"
      },
      {
        "id": "56",
        "ingredientId": "49",
        "recipeId": "10"
      },
      {
        "id": "57",
        "ingredientId": "50",
        "recipeId": "10"
      },
      {
        "id": "58",
        "ingredientId": "51",
        "recipeId": "10"
      },
      {
        "id": "59",
        "ingredientId": "52",
        "recipeId": "10"
      }
    ],
    "users": [
      {
        "id": "1",
        "username": "maz",
        "password": "password"
      },
      {
        "id": "2",
        "username": "jon",
        "password": "tada"
      },
      {
        "id": "3",
        "username": "robin",
        "password": "kjkj"
      }
    ],
    "favorites": [ ]
}

writeFileSync("db.json", JSON.stringify(db, null, 2));