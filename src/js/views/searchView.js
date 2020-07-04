const {elements} = require('./base')

const getInput = () => elements.searchInput.value

const clearInput = () => {
    elements.searchInput.value = ""
}

const clearResults = () => {
    elements.searchResultList.innerHTML =""
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []
 if(title.length > limit){
    title.split(' ').reduce((acc,cur) => {
        if(acc + cur.length <= limit){
            newTitle.push(cur)
        }
        return acc+cur.length
    }, 0)

    return `${newTitle.join(' ')}...`
 }
 return title;
}

const renderRecipes = recipe => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src=${recipe.image_url} alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
        </button>
<!--
                <button class="btn-inline results__btn--prev">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
                <button class="btn-inline results__btn--next">
                    <span>Page 3</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button>
                -->
`;


const renderButtons = (page, numResults, resPerPage) => {

    const pages = Math.ceil(numResults / resPerPage);
    let  button;
    if(page === 1 && pages > 1){
        //Only to go to the next page
        button = createButton(page, 'next');
    }else if(page < pages){
        //Both Buttons
        button = `
            ${createButton(page,'prev')}
            ${createButton(page,'next')}
        `;
    }else if(page === pages && pages > 1){
        //Only button to go to previous page
        button = createButton(page,'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

const renderResults = (recipes, page = 1, resultPerPage = 10) => {
    const start = (page - 1) * resultPerPage;
    const end = page * resultPerPage;

    recipes.slice(start, end).forEach(renderRecipes);

    //render pagination buttons
    renderButtons(page,recipes.length,resultPerPage);
}; 
module.exports = {
    getInput,
    renderResults,
    clearInput,
    clearResults
}