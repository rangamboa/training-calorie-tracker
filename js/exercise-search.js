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
var result = $('.result');
var workoutDisp = $('#exerciseDisplay');
var totalDisp = $('#totalDisplay');


form.on('submit', function(event) {

  event.preventDefault();

  console.log('search function called.');

  queryItem = input.val();

  console.log(queryItem);

  makeRequest(queryItem);
  input.val('');

});

function makeRequest(queryItem) {

  requestUrl = url + '&gender=female&age=35';
  console.log(requestUrl);
  console.log(queryItem);

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

    workouts = data;
    console.log(workouts);

    console.log('types of workouts: '+ workouts.exercises.length);

    for (i=0; i< workouts.exercises.length; i++) {
      console.log('----------');
      console.log((i+1) + ') ' + workouts.exercises[i].name);
      console.log('length of workout (min): ' + workouts.exercises[i].duration_min);
      console.log('calories burned (cal): ' + workouts.exercises[i].nf_calories);
    }

 
  for (i=0; i< workouts.exercises.length; i++) {

    numWorkouts++;

    workoutDisp.append('✅ Workout #' + numWorkouts + ', ' + workouts.exercises[i].name + ' for ' + + workouts.exercises[i].duration_min + ' minutes, burns ' + Math.floor(workouts.exercises[i].nf_calories) +' calories.<br />');

    numCals+=Math.floor(workouts.exercises[i].nf_calories);

    totalDisp.empty();
    totalDisp.append('💪 Total Workouts: '+ numWorkouts);
    totalDisp.append('<br />');
    totalDisp.append('🔥 Total Calories Burned: '+ numCals);

  }


  });

}

