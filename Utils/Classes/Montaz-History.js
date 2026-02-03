

class MontazHistory {
    constructor(orderId){
        this.orderId = orderId
        this.size = null
        this.delivery = null
        this.delivery_point = null
        this.guaranties = null
    }
    setSize(obj){
        this.size = {...obj}
    }
    setDelivery(obj){
        this.delivery = {...obj}
    }
    setDeliveryPoint(obj){
        this.delivery_point = {...obj}
    }
    setGuaranties(obj){
        this.guaranties = {...obj}
    }
}

module.exports = MontazHistory
