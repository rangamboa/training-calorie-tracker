// Declare variables.
var apiKey = "7d64f63f6bcf8a707e9c268f5f94f438";
var apiId = "f11e9b5e";
var url = 'https://trackapi.nutritionix.com/v2/natural/exercise?query=';
var queryItem;

var form = document.querySelector('form');
var input = document.querySelector('input[type="text"]');
var result = document.querySelector('.result');

function search(event) {
  
  event.preventDefault();
  queryItem = input.value;

  console.log(queryItem);

  makeRequest(queryItem);
  input.value = '';
}

// function createFood(name, qty, unit, photo) {

//   var item = document.createElement('div');
//   var foodName = document.createElement('h4');
//   var serving = document.createElement('p');
//   var img = document.createElement('img');
  
//   item.classList.add('item');
//   foodName.innerHTML = name;
//   serving.innerHTML = qty + ' ' + unit;
//   img.src = photo;
  
//   result.appendChild(item);
//   item.appendChild(img);
//   item.appendChild(foodName);
//   item.appendChild(serving);
  
// }

function makeRequest(queryItem) {

  requestUrl = url + queryItem + '&gender=female&age=35',
  console.log(requestUrl);

  fetch(requestUrl, {
    method: 'POST', // or 'PUT'
    headers: {
      'x-app-id': 'f11e9b5e',
      'x-app-key': '7d64f63f6bcf8a707e9c268f5f94f438',
      'x-remote-user-id': 0,
      'Content-Type': 'application/json'
    }
  })

  .then(response => {
    response.json();
    console.log(response);
  })
  .then(data => {

      console.log(data);

  });
}

  // xhr = new XMLHttpRequest();

  // xhr.onload = function() {
  //   var response = JSON.parse(this.responseText);

    //console.log(response);

    // response.common.map(function(food){
    //   createFood(food.food_name,
    //              food.serving_qty,
    //              food.serving_unit,
    //              food.photo.thumb
    //             )
    // })
//   };

//   xhr.open(
//     "GET",
//     url+queryItem,
//     true
//   );

//   xhr.setRequestHeader('x-app-id', apiId);
//   xhr.setRequestHeader('x-app-key', apiKey);
//   xhr.send();
// }

form.addEventListener('submit', search)