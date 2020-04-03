import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
import { elements,renderLoader, clearLoader } from './views/base';

/**Global state of the app
* - Search object
* - current recipe object
* - shopping list object
* - Liked recipes
*/

const state = {};

/*
SEARCH CONTROLLER
*/
const controlSearch = async () => {

    //Get the query
    const query = searchView.getInput() ;
    console.log(query);

    if(query){

        //New search object and add to state
        state.search = new Search(query);


        //Prepare the UI
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        try{
        //Search for recipes
        await state.search.getResults();

        //render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);

    }catch(err){
        alert('Something weong with the search');
        clearLoader();
    }
}
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }
});


/*
RECIPE CONTROLLER
*/

 const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    
    if(id){
        //Prepare UI for the changes

        //Create new recipe objects
        state.recipe = new Recipe(id);

        try{
        //Get the recipe data
        await state.recipe.getRecipe();

        //Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        //Render recipe
        console.log(state.recipe);
    }catch(error){
        alert('Error processing Recipe ! ');
    }
}
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load',controlRecipe);

['hashchange','load'].forEach(event => window.addEventListener(event , controlRecipe));