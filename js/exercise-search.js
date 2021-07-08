// Declare variables.

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

  if (gender == 'none' || gender == 'other') 

  var gender = ":"female",
  var weight_kg = ":72.5,
  var height_cm = ":167.64,
  var age = ":30


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
    .then((responseData) => {
      console.log(responseData)
      let recipeCalArr = []

      for (let i = 0; i < responseData.hits.length; i++) {
        let calories = responseData.hits[i].recipe.calories
        let recipeName = responseData.hits[i].recipe.label
        let recipeLink = responseData.hits[i].recipe.url
        recipeCalArr.push(recipeName, recipeLink, calories);
      }

      console.log(recipeCalArr);
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

      console.log(rand)
      console.log(recipeCalArr[rand]);
      console.log(recipeCalArr[rand+1]);
      console.log(recipeCalArr[rand+2]);

      let plural
      if (numToConsume > 1)  plural = 's.'
      else plural = '.';

      $("#recipeAPIcard").removeAttr('hidden');
      $("#itemEat").text("In order to fill that void we suggest making " + numToConsume + " " + recipeCalArr[rand] + plural)
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

// This function clears the pink background if there is an input error in the User Profile section.
statsEl.on('click', function(event) {
    event.preventDefault();
    event.target.style = 'background-color: white';
});

// This checks for valid input values in the user profile section, then converts to metric to be used by the API query.
enterButton.on('click', function(event) {

    okay = 1;
    event.preventDefault();
    console.log('User Info should have been entered at this point.\nNeed to check for validity.');

    console.log(gender.value);

    // Check for valid input values.

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
    if (htInItem[0].value < 0 || htInItem[0].value > 12) {
        alert('Please enter a valid height in inches.');
        htInItem[0].value = '';
        htInItem[0].style = 'background-color: pink;';
        okay = 0;    
    } else htInItem[0].value = 0;
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
        console.log(calcHeight);

        // Then, convert to centimeters.
        calcHeight = Math.floor(calcHeight*2.54);
        console.log(calcHeight);

        // Convert weight in pounds to kilograms to satisfy API query parameter requirement.
        calcWeight = Math.floor(parseInt(weightItem[0].value)/2.205);
        console.log(calcWeight);



    }
    else { console.log('sometehing is off.'); return; }
});