const { Search } = require('./models/Search')
const{ elements, renderLoader,clearLoader } = require('./views/base')
const searchView = require('./views/searchView')
const { clearResults } = require('./views/searchView')
const {Recipe}  =require('./models/Recipe')
const recipeView = require('./views/recipeView')
const {List} = require('./models/List')

//Global State
const state = {}

const controlSearch= async () => {
    const query = searchView.getInput()

    if(query){
        state.search = new Search(query)

        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.serachRes)

        try{

        await state.search.getResult()
        clearLoader()

        searchView.renderResults(state.search.result)
    }catch(e){
        alert('Something went wrong with the search')
        clearLoader()
    }
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

const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    

    if(id){
        recipeView.clearRecipe()
        renderLoader(elements.recipe)

        if(state.search) {searchView.highlightSelected(id)}
        
        state.recipe = new Recipe(id)
              

        try{
            
        await state.recipe.getRecipe()
        state.recipe.parseIngredients()
        state.recipe.calculateTime()
        state.recipe.calculateServings()

        clearLoader()
        recipeView.renderRecipe(state.recipe)

        
        }catch(e){
            console.log('Error processing recipe')
        }
    }
}


['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe))

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){

        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe)
    }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        
            state.recipe.updateServings('inc')
            recipeView.updateServingsIngredients(state.recipe)
 
    }

})

window.l = new List()