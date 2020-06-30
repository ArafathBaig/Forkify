const { Search } = require('./models/Search')

//Global State
const state = {}

const controlSearch= async () => {
    const query = 'pizza'

    if(query){
        state.search = new Search(query)

        await state.search.getResult()

        console.log(state.search.result)
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault()
    controlSearch();
})
