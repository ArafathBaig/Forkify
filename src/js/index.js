import Search from './models/Search';

/**Global state of the app
* - Search object
* - current recipe object
* - shopping list object
* - Liked recipes
*/

const state = {};

const controlSearch = async () => {

    //Get the query
    const query = 'pizza';

    if(query){

        //New search object and add to state
        state.search = new Search(query);

        //Prepare the UI

        //Search for recipes
        await state.search.getResults();

        //render results on UI
        console.log(state.search.result);

    }
}
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
