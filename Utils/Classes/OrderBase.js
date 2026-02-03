const Handling = require('../Classes/Handling')

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

module.exports = new OrderBase();
