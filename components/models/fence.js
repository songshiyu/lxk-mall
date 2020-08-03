import { Cell } from "./cell"

class Fence{

    cells = []

    specs

    constructor(specs){
        this.specs =specs
    }

    init(){
        this.specs.forEach(spec => {
            const cell = new Cell(spec)
           this.cells.push(cell)
        })
    }

    pushValueTitle(title){
        this.valueTitle.push(title)
    }
}

export{
    Fence
}