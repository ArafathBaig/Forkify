const {elements} = require('./base')

const getInput = () => elements.searchInput.value

const clearInput = () => {
    elements.searchInput.value = ""
}

const clearResults = () => {
    elements.searchResultList.innerHTML =""
}

const renderRecipes = recipe => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src=${recipe.image_url} alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

const renderResults = recipes => {
    console.log(recipes)
    recipes.forEach(renderRecipes)
}

module.exports = {
    getInput,
    renderResults,
    clearInput,
    clearResults
}