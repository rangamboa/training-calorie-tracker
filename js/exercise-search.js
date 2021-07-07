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

  });

}

