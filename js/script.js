// "exercise to calories" API call

var apiKey = "7d64f63f6bcf8a707e9c268f5f94f438";
var apiId = "f11e9b5e";
var queryItem;
var url = 'https://trackapi.nutritionix.com/v2/search/instant?query=';

var form = document.querySelector('form');
var input = document.querySelector('input[type="text"]');
var result = document.querySelector('.result');

function search(e){
  e.preventDefault();
  queryItem = input.value;
  makeRequest(queryItem);
  input.value= "";
}

function createFood(name, qty, unit, photo){
  var item = document.createElement('div');
  var foodName = document.createElement('h4');
  var serving = document.createElement('p');
  var img = document.createElement('img');
  
  item.classList.add('item');
  foodName.innerHTML = name;
  serving.innerHTML = qty+' '+unit;
  img.src = photo;
  
  result.appendChild(item);
  item.appendChild(img);
  item.appendChild(foodName);
  item.appendChild(serving)
  
}
function makeRequest(queryItem) {
  xhr = new XMLHttpRequest();

  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
    response.common.map(function(food){
      createFood(food.food_name,
                 food.serving_qty,
                 food.serving_unit,
                 food.photo.thumb
                )
    })
  };
  xhr.open(
    "GET",
   url+queryItem,
    true
  );
  xhr.setRequestHeader('x-app-id',apiId);
  xhr.setRequestHeader('x-app-key',apiKey);
  xhr.send();
}


form.addEventListener('submit', search)