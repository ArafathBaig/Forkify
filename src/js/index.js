const { Search } = require('./models/Search')
const{ elements, renderLoader,clearLoader } = require('./views/base')
const searchView = require('./views/searchView')
const { clearResults } = require('./views/searchView')
const {Recipe}  =require('./models/Recipe')
const recipeView = require('./views/recipeView')
const {List} = require('./models/List')
const listView = require('./views/listView')

//Global State
const state = {}

window.state = state;


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

const controlList = () => {
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderItem(item)
    })
}

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid

    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id)

        listView.deleteItem(id)

    }else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10)
        state.list.updateCount(id,val)
    }
})

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){

        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe)
    }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        
            state.recipe.updateServings('inc')
            recipeView.updateServingsIngredients(state.recipe)
 
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--addd *' )){
        controlList()
    }

})

window.l = new List()