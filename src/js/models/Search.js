const axios = require('axios')

class Search {
    constructor(query){
        this.query = query
    }

    async getResult(query){

    try{
    const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
    this.result = res.data.recipes
    console.log(this.result)
    }catch(e){
        alert(e)
    }
}
}


module.exports = {
    Search
}