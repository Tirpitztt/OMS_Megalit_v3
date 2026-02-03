

class HandlingHistory {
    constructor(orderId){
        this.orderId = orderId
        this.hydrophob = null
        this.textGrav = null
    }
    setHydrophob(obj){
        this.hydrophob = obj
    }
    setTextGrav(obj){
        this.textGrav = obj
    }

}

module.exports = HandlingHistory
