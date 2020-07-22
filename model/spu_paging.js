const { pageing } = require("../utils/paging");

class SpuPaging{

    static getLastestPaging(){
        return new pageing({
            url: "spu/latest"
        },3)
    }

    //1.一条数据都没有 空
    //2.最后一页，还有没有更多的数据
    //3.累加 
    //4.分页加载的一种状态
    //5.上滑页面触底，加载，避免用户重复发请求
}

export{
    SpuPaging
}