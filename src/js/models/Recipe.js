const axios = require('axios')

class Recipe{
    constructor(id){
        this.id = id
    }

    async getRecipe() {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            this.title = res.data.recipe.title
            this.author = res.data.recipe.publisher
            this.img = res.data.recipe.img_url
            this.img = res.data.recipe.image_url
            this.url = res.data.recipe.source_url
            this.ingredients = res.data.recipe.ingredients
            
        }catch(e){
            console.log(e)
            alert('Something went wrong :(')
        }
    }

    calculateTime(){
        const numIng = this.ingredients.length
        const periods = Math.ceil(numIng/3)
        this.time = periods * 15
    }

    calculateServings() {
        this.servings = 4
    }
}

module.exports = {
    Recipe
}