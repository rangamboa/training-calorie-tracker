// Number of Recipes 20
let recipesMax = 20;

function recipeSearch(caloriesMax, caloriesMin) {
        fetch("https://api.edamam.com/api/recipes/v2?app_id=c0e0f66e&app_key=cf84cbb0849e2b329dc49ca9dc674ee2&type=public&from=0&to=" + recipesMax + "&calories="+ caloriesMin +"-"+ caloriesMax)
        .then((response) => {
            if (!response.ok) {
                window.alert(response.statusText)
            } else {
                return response.json();
            };
        })
        .then((responseData) => {
            console.log(responseData);
            for (let i = 0; i < responseData.hits.length; i++) {
                console.log(responseData.hits[i].recipe.url);
            };      
        })
}