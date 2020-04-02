import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/**Global state of the app
* - Search object
* - current recipe object
* - shopping list object
* - Liked recipes
*/

const state = {};

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
        
        //Search for recipes
        await state.search.getResults();

        //render results on UI
        searchView.renderResults(state.search.result);

    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
