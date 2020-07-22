const { Http } = require("../utils/Http")

class Categoty{
    static async getCategoryA(){
        return await Http.request({
            url:"category/grid/all"
        })
    }
}

export{
    Categoty
}