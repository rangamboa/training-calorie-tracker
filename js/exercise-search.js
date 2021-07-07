// Declare variables.
var apiKey = "7d64f63f6bcf8a707e9c268f5f94f438";
var apiId = "f11e9b5e";
var url = 'https://trackapi.nutritionix.com/v2/natural/exercise?query=';
var queryItem;
var workouts = [];
var numWorkouts = 0;
var numCals = 0;

var form = $('form');
var input = $('#workoutInput');
var workoutDisp = $('#exerciseDisplay');
var totalDisp = $('#totalDisplay');

// Capture workout information from form.
form.on('submit', function(event) {

  event.preventDefault();

  // Assign value to queryItem to use in API.
  queryItem = input.val();

  // Call function to make API request.
  makeRequest(queryItem);

  // Clear value of input box.
  input.val('');

});

function makeRequest(queryItem) {

  // This needs to be further modified with user information (height, weight, age)
  requestUrl = url + '&gender=female&age=35';
  
  // console.log(requestUrl);
  // console.log(queryItem);

  fetch(requestUrl, {
    method: 'POST',
    body: JSON.stringify({query: queryItem}),
    headers: {
      'x-app-id': 'f11e9b5e',
      'x-app-key': '7d64f63f6bcf8a707e9c268f5f94f438',
      'x-remote-user-id': 0,
      'Content-Type': 'application/json',
    }
  })

  .then(response => response.json())
  .then(data => { 

    // Assigns pulled data to "workouts" to be parsed and used.
    workouts = data;

    // Console logging for tracking and checking variables.

    // console.log(workouts);
    // console.log('types of workouts: '+ workouts.exercises.length);

    // for (i=0; i< workouts.exercises.length; i++) {
    //   console.log('----------');
    //   console.log((i+1) + ') ' + workouts.exercises[i].name);
    //   console.log('length of workout (min): ' + workouts.exercises[i].duration_min);
    //   console.log('calories burned (cal): ' + workouts.exercises[i].nf_calories);
    // }

    // Loop through number of workouts.
    for (i=0; i< workouts.exercises.length; i++) {

      // Increase workout total for (display purposes only).
      numWorkouts++;

      // Update workout list display.
      workoutDisp.append('✅ Workout #' + numWorkouts + ', ' + workouts.exercises[i].name + ' for ' + + workouts.exercises[i].duration_min + ' minutes, burns ' + Math.floor(workouts.exercises[i].nf_calories) +' calories.<br />');

      // Round calories down for readability.
      numCals+=Math.floor(workouts.exercises[i].nf_calories);

      // Update running display of total workouts and total calories burned.
      totalDisp.empty();
      totalDisp.append('💪 Total Workouts: '+ numWorkouts);
      totalDisp.append('<br />');
      totalDisp.append('🔥 Total Calories Burned: '+ numCals);
  }

  // Keep track of numCals (total calories burned).
  console.log(numCals);

  // Pass numCals to another function WITHIN this fetch request.
  randomFoodItemGen(numCals, 0);
  });

}

// Number of Recipes Capped at 20 for now, would only slow down page load if we increased this
function randomFoodItemGen(caloriesMax, caloriesMin) {
  // Decaling placeholder arrays for later parsing
    let recipesMax = 20;
    let recipeArr = [];
    let ingredientsObjArr = [];
    let foodCatArr = [];
    let foodNameCalArr = [];
    let plural;
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

        let numToConsume = Math.ceil(caloriesMax / foodNameCalArr[1]);
        // Logging for readability, will show just name of food [0], number to eat [1], Brand (if defined)[2] and the food id[3]
        console.log(foodNameCalArr);
        // Add to this to change formating for how content is written to page (Will move into a span eventually) Add this line depending on whether it is defined ( + " from the brand " + foodNameCalArr[2] )

        if (numToConsume > 1) plural = 's.';
        else plural = '.';

        $("#itemEat").text("To fill that void you're probably feeling after such a strenous workout you should eat... " + numToConsume +" " + foodNameCalArr[0] + plural);
        // Maybe want to add another fetch to do specific food item lookup from our new item of foodID
    })
  })
}

// randomFoodItemGen(1000, 0);

