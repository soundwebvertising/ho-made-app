const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "6a399120"
const APP_KEY = "f09405df263bafbeeb5b8f508a799a65"
const proxyUrl = 'https://fast-taiga-63597.herokuapp.com/'
//const apiUrl = 'https://api.edamam.com/search?app_id=' + APP_ID + '&app_key=' + API_KEY + '&q=pizza';
//const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=30`;
//const response = await fetch(proxyUrl + apiUrl);


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  searchQuery = e.target.querySelector('input').value;
  console.log(searchQuery)
  fetchAPI();
});

async function fetchAPI (){
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=30`;
  const response = await fetch(proxyUrl + baseURL);
  const data = await response.json();
  generateTheHTML(data.hits);
  console.log(data.hits);
}

function generateTheHTML(results){
  container.classList.remove('initial');
  let generatedHTML = '';
  results.map(result => {
    generatedHTML +=
    `
    <div class="item">
      <img src="${result.recipe.image}" alt="" >
      <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
      </div>          
      <p class="item-data">${result.recipe.calories.toFixed(2)}</p>
    </div>
    `    
  });
  searchResultDiv.innerHTML = generatedHTML;
}