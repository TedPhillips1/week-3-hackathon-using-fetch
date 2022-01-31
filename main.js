/*
create layout on HTML
    top bar including logo and search element
    on left:
    large image with layered text over top
    white boxes containg API info
    On right:
    a list contained in a white box
    text explaining our story
Style using CSS
completed - fetch data from API 
    use the search bar as an entry form for changing the input into the API 
        select search bar 
        select search button
        when text is typed update a var 
        when button clicked let food equal var 
completed - Insert data from API into the HTML elements
    select all elements required
    let them elements equal the data inside the function 
completes - Add a star button to save recipes on the right hand side list
create multiple
add a nav bar for different types of recipes 
*/
let food;
async function fetchRecipe(food) {
    let response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + food + "&app_id=1895675c&app_key=fed3e22851997d27b39c7cf2d72aa276")
    let data = await response.json()
    return data
}

let searchBar = document.querySelector(".search-bar");
let searchButton = document.querySelector(".search-button");

let search;
function handleKeyPress(event) {
    search = event.target.value
};

let recipeData;
async function handleButton() {
    food = search
    recipeData = await fetchRecipe(food)
    recipeTitle.innerHTML = recipeData.hits[0].recipe.label
    recipeImage.src = recipeData.hits[0].recipe.images.SMALL.url
    linkToRecipe.href = recipeData.hits[0].recipe.shareAs
    makeList()
    return console.log(recipeData)
};

searchBar.addEventListener("keyup", handleKeyPress);
searchButton.addEventListener("click", handleButton);
window.addEventListener("load", handleButton)

let recipeTitle = document.querySelector(".recipe-header")
let ingredients = document.querySelector(".recipe-ingredients")
let linkToRecipe = document.querySelector(".link-to-recipe")
let recipeImage = document.querySelector(".recipe-image")


// make a list of the ingredients:
// created a function that finds length of ingredients list 
// for each create a list item 

let storeList = [];
function makeList() {
ingredients.innerHTML = "";
let length = recipeData.hits[0].recipe.ingredientLines.length
for (let i = 0; i < length; i++){
    let list = ingredients
    let listItem = document.createElement("li");
    listItem.innerHTML = recipeData.hits[0].recipe.ingredientLines[i]
    list.appendChild(listItem)
}
}

let saveRecipe = document.querySelector(".save-recipe")
let savedRecipeList = document.querySelector(".saved-recipe-list")

function makeSavedRecipeList() {
    let savedItem = document.createElement("li");
    savedItem.innerHTML = recipeData.hits[0].recipe.label
    savedRecipeList.appendChild(savedItem)
}

saveRecipe.addEventListener("click", makeSavedRecipeList)