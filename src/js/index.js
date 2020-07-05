const { Search } = require('./models/Search')
const{ elements, renderLoader,clearLoader } = require('./views/base')
const searchView = require('./views/searchView')
const { clearResults } = require('./views/searchView')
const {Recipe } =require('./models/Recipe')

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

elements.searchResPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline')
    
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearResults()
        searchView.renderResults(state.search.result,goToPage)
    }
})


const r = new Recipe(47746)
r.getRecipe()