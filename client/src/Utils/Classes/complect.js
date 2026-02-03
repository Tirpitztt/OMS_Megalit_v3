

class Complect {
    constructor(type,orderId = 0) {
        this.type = type;
        this.id = Math.ceil(Math.random()*1000)
        this.summComplect = 0;
        this.complect_items = [];
        this.orderId = orderId
    }
    getComplect(){
        return this
    }
    setSum(sum){
        this.summCompl = sum;
    }
    setOrderId(id){
        this.orderId = id
    }
    addDetail(detail){
        this.complect_items.push(detail)
    }
    getDetails(){
        return this.complect_items
    }
    getType(){
        return this.type
    }
}

module.exports = Complect;
