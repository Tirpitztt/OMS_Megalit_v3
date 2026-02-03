import Handling from '../Classes/handling'

class OrderBase {
    constructor() {
        this.complects = []
        this.handling = Handling
    }
    getOrder(){
        return this
    }
    addToComplects(complect){
        this.complects.push(complect)
    }
}

export default  new OrderBase()
