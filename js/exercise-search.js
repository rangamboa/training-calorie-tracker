// Declare variables.
  // User Variables
var nameItem = $('.usersName');
var ageItem = $('.usersAge');
var htFtItem = $('.usersHtft');
var htInItem = $('.usersHtin');
var weightItem = $('.usersWeight');
var saveButton = $('#saveBtn');
var enterButton = $('#enterBtn');
var statsEl = $('.statsButton');
var okay = 1;
var calcHeight;
var calcWeight;
var genderItem = $('#gender');
  // API Variables
var apiKey = "7d64f63f6bcf8a707e9c268f5f94f438";
var apiId = "f11e9b5e";
var url = 'https://trackapi.nutritionix.com/v2/natural/exercise?query=';
var queryItem;
var workouts = [];
var numWorkouts = 0;
var numCals = 0;
  // Input Variables
var form = $('form');
var input = $('#workoutInput');
var workoutDisp = $('#exerciseDisplay');
var totalDisp = $('#totalDisplay');

// Capture workout information from form
form.on('submit', function(event) {

  event.preventDefault();
  $("#recipeAPIcard").removeClass('active');

  // Assign value to queryItem to use in API.
  queryItem = input.val();

  // Call function to make API request.
  makeRequest(queryItem);

  // Clear value of input box.
  input.val('');
  $("#trainerAPIcard").addClass('active');
});

// Sends workout query to API
function makeRequest(queryItem) {

  if (genderItem[0].value === 'none' || genderItem[0].value === 'other') {
    gender = '';
  } else gender = ((genderItem[0].value).toString()).toLowerCase();

// USER DEMO LOG TOGGLE
  // console.log(gender);
  // console.log('age: '+ageItem[0].value);
  // console.log('height: '+calcHeight);
  // console.log('weight: '+calcWeight);

  requestUrl = url + '&gender=' + gender + '&age=' + ageItem[0].value + '&height_cm=' + calcHeight + '&weight_kg=' + calcWeight;

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

// Generates recipes from second API based on request info
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
    .then((responseData) => {
      // Parsing response...
      let recipeCalArr = []

      for (let i = 0; i < responseData.hits.length; i++) {
        let calories = responseData.hits[i].recipe.calories
        let recipeName = responseData.hits[i].recipe.label
        let recipeLink = responseData.hits[i].recipe.url
        recipeCalArr.push(recipeName, recipeLink, calories);
      }

      let choices = []
      let x = 0
      for (let i = 0; i < recipeCalArr.length; i++) {
        choices.push(x);
        x = (x+3);
      }

      for (let i = choices.length; i > 0; i--) {
        if (choices[i] > recipeCalArr.length) {
          choices.pop()
        }
      }

      let rand = choices[Math.floor(Math.random() * choices.length)];
      let numToConsume = Math.floor(caloriesMax / Math.floor(recipeCalArr[rand+2]))

      let plural
      if (numToConsume > 1)  plural = 's.'
      else plural = '.';

      let noRec = recipeCalArr[rand].replace('Recipe' || 'Recipes' || 'recipe' || 'recipes',"")
      
      // Populates HTML with content
      $("#recipeAPIcard").addClass('active');
      $("#itemEat").text("Hello " + nameItem[0].value +"! In order to fill that void we suggest making " + numToConsume + " " + noRec.trim() + plural)
      $("#itemLink").attr('href', recipeCalArr[rand+1]);
      $("#itemLink").attr('target', "_blank");
      $("#itemLink").text("Click here to go to the recipe page!");
  })
}

function createUser() {
    const user = localStorage.setItem(nameItem, ageItem, heightItem, weightItem);
}

saveButton.on('click', function() {

  document.getElementsByName(user).values();

  if(user < 1 ){
      console.log("No users found");
  } else {
      for(var i = 0; i< localStorage.length; i++);
  }

});

// These functions clear the pink background if there is an input error in the User Profile section.
statsEl.on('click', function(event) {
    event.preventDefault();
    event.target.style = 'background-color: white';
});

nameItem.on('click', function(event) {
  event.preventDefault();
  event.target.style = 'background-color: white';
});

// This checks for valid input values in the user profile section, then converts to metric to be used by the API query.
enterButton.on('click', function(event) {

    okay = 1;
    event.preventDefault();
    console.log('Checking user info for validity.');

    console.log(genderItem[0].value);

    // Check for valid input values.

    console.log(nameItem[0].value);

    if (nameItem[0].value == '') {
        alert('Please enter a name.');
        nameItem[0].value = '';
        nameItem[0].style = 'background-color: pink;';
        okay = 0;
    }

    if (ageItem[0].value <= 0) {
        alert('Please enter a valid number for age.');
        ageItem[0].value = '';
        ageItem[0].style = 'background-color: pink;';
        okay = 0;
    }

    if (htFtItem[0].value <= 0) {
        alert('Please enter a valid height in feet.');
        htFtItem[0].value = '';
        htFtItem[0].style = 'background-color: pink;';
        okay = 0;
    }
    if (htInItem[0].value < 0 || htInItem[0].value > 11) {
        alert('Please enter a valid height in inches.');
        htInItem[0].value = '';
        htInItem[0].style = 'background-color: pink;';
        okay = 0;    
    }
    if (weightItem[0].value <= 0) {
        alert('Please enter a valid weight in pounds.');
        weightItem[0].value = '';
        weightItem[0].style = 'background-color: pink;';
        okay = 0;
    }

    // If all inputs are valid, proceed.
    if (okay == 1) {

        console.log('looks good, converting stats to metric.');
        // Convert height in feet/inches to centimeters to satisfy API query parameter requirement.

        // First, convert to height in inches.
        calcHeight = (parseInt(htFtItem[0].value)*12)+parseInt(htInItem[0].value);
        console.log(calcHeight + ' height in inches');

        // Then, convert to centimeters.
        calcHeight = Math.floor(calcHeight*2.54);
        console.log(calcHeight + ' height in centimeters');

        // Convert weight in pounds to kilograms to satisfy API query parameter requirement.
        calcWeight = Math.floor(parseInt(weightItem[0].value)/2.205);
        console.log(calcWeight + ' weight in kilograms');

        // Save user info  
        // storeData();


    }
    else { console.log('A field in the user data is invalid.'); return; }
});

// Pulls new random recipe
let newRecipeBtn = $("#newRecipe")
newRecipeBtn.on('click', function() {
  $("#recipeAPIcard").removeClass('active');
  randomFoodItemGen(numCals, 0);
})

function storeData() {
  
}