// Number of Recipes Capped at 20 for now, would only slow down page load if we increased this
function randomFoodItemGen(caloriesMax, caloriesMin) {
  // Decaling placeholder arrays for later parsing
    let recipesMax = 20;
    let recipeArr = [];
    let ingredientsObjArr = [];
    let foodCatArr = [];
    let foodNameCalArr = [];
    // First fetch for recipes, 20 total
    fetch(
    "https://api.edamam.com/api/recipes/v2?app_id=c0e0f66e&app_key=cf84cbb0849e2b329dc49ca9dc674ee2&type=public&from=0&to=" +
      recipesMax +
      "&calories=" +
      caloriesMin +
      "-" +
      caloriesMax
    )
    // If bad response, which shouldnt happen, send an alert
    .then((response) => {
      if (!response.ok) {
        window.alert(response.statusText);
      } else {
        return response.json();
      }
    })
    // Parse out relevant recipe data
    .then((responseData) => {

      for (let i = 0; i < responseData.hits.length; i++) {
        recipeArr.push(responseData.hits[i].recipe);
      }
      
      for (let i = 0; i < recipeArr.length; i++) {
        for (let x = 0; x < recipeArr[i].ingredients.length; x++) {
          ingredientsObjArr.push(recipeArr[i].ingredients[x]);
        }
      }
      
      for (let i = 0; i < ingredientsObjArr.length; i++) {
        if (ingredientsObjArr[i].foodCategory !== null) {
          foodCatArr.push(ingredientsObjArr[i].foodCategory);
        }
      }
    // Generating random selection from ingredients within all recipes
    let rand = foodCatArr[Math.floor(Math.random() * foodCatArr.length)];
    // Fetching food items from above random ingredient
    fetch(
        "https://api.edamam.com/api/food-database/v2/parser?app_id=3cec3bc1&app_key=0f0adaf366c3696d4953db60eceb9f62&ingr=" + rand +"&calories=" + caloriesMin + "-" + caloriesMax
    )
    .then((response) => response.json())
    .then((responseData) => {
      // Gens random index, creates variables for our final array
      let randIndex = Math.floor(Math.random() * responseData.hints.length);
      let key = responseData.hints[randIndex].food.label;
      let value = responseData.hints[randIndex].food.nutrients.ENERC_KCAL;
      let brand = responseData.hints[randIndex].food.brand;
      let foodId = responseData.hints[randIndex].food.foodId;

      foodNameCalArr.push(key, value, brand, foodId);

        // THIS IS DUMMY VARIABLE
        // THIS IS DUMMY VARIABLE
        let numCals = 4300;
        // THIS IS DUMMY VARIABLE
        // THIS IS DUMMY VARIABLE
        let numToConsume = Math.ceil(numCals / foodNameCalArr[1]);
        // Logging for readability, will show just name of food [0], number to eat [1], Brand (if defined)[2] and the food id[3]
        console.log(foodNameCalArr);
        // Add to this to change formating for how content is written to page (Will move into a span eventually) Add this line depending on whether it is defined ( + " from the brand " + foodNameCalArr[2] )
        $("#itemEat").text("To fill that void you're probably feeling after such a strenous workout you should eat... " + numToConsume +" " + foodNameCalArr[0] + "'s" );
        // Maybe want to add another fetch to do specific food item lookup from our new item of foodID
    })
  })
}

randomFoodItemGen(1000, 0);
