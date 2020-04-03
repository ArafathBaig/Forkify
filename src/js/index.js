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

        //Search for recipes
        await state.search.getResults();

        //render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);

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

const r = new Recipe(47746);
r.getRecipe();
console.log(r);