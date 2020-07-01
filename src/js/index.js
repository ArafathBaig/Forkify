const { Search } = require('./models/Search')
const{ elements } = require('./views/base')
const searchView = require('./views/searchView')
//Global State
const state = {}

const controlSearch= async () => {
    const query = searchView.getInput()

    if(query){
        state.search = new Search(query)

        await state.search.getResult()

        console.log(state.search.result)
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch();
})
