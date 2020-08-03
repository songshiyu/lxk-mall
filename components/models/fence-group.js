import { Fence } from "./fence"

const { Matrix } = require("./matrix")

class FenceGroup{

    spu
    skuList = []

    constructor(spu){
        this.spu = spu
        this.skuList = spu.sku_list
    }

    initFence1(){
       const matrix = this._createMatrix(this.skuList)
       let currentj = -1;
       let fences = []
       matrix.foreach((element,i,j) => {
            if(currentj != j){
                //开启一个新列，需要创建一个fence
                currentj = j
                fences[currentj] =  this._createFence()
            }
            fences[currentj].pushValueTitle(element.value)
        })
    }

    /**
     * 利用矩阵的转置思想实现
    */
    initFence(){
        const matrix = this._createMatrix(this.skuList)
        let fences = []

        const AT = matrix.transpose()
        AT.forEach(r => {
           const fence = new Fence(r)
           fence.init()
           fences.push(fence)
        })

        console.log(fences)
    }

    _createFence(){
        const fence = new Fence()
        return fence
    }

    _createMatrix(skuList){
        const m = []
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
}

export{
    FenceGroup
}