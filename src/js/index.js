const { Search } = require('./models/Search')
const{ elements, renderLoader,clearLoader } = require('./views/base')
const searchView = require('./views/searchView')
//Global State
const state = {}

const controlSearch= async () => {
    const query = searchView.getInput()

    if(query){
        state.search = new Search(query)

        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.serachRes)

        await state.search.getResult()
        clearLoader()

        searchView.renderResults(state.search.result)
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch();
})
