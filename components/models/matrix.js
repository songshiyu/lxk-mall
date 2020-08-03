class Matrix{
    m
    constructor(matrix){
        this.m = matrix
    }

    getRowsNum(){
        return this.m.length
    }

    getColumnNum(){
        return this.m[0].length
    }

    foreach(cb){
        for(let j = 0; j < this.getColumnNum();j++){
            for(let i = 0; i < this.getRowsNum();i++){
                const element = this.m[i][j]
                cb(element,i,j)
            }
        }
    }

    /**
     * 利用矩阵的转置思想实现
    */
    transpose(){
        const desArr = []
        for(let j = 0;j < this.getColumnNum();j++){
            desArr[j] = []
            for(let i = 0;i < this.getRowsNum();i++){
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }
}


export{
    Matrix
}