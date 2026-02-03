

class OrdersState {
    constructor() {
        this.inNew = [];
        this.inPour = [];
        this.inCut = [];
        this.inPolyr = [];
        this.inGrav = [];
        this.inVol = [];
        this.inReady = [];
        this.inLoad = [];
        this.redOrders = [];
        this.orangeOrders = [];
        this.allOrders = 0;
        this.utmPoint = [0,0,0,0,0,0,0,0];
    }

    getState(){
        return this
    }
    setAllOrders(num){
        this.allOrders = num;
    }
    addInNew(order){
        this.inNew.push(order)
    }
    addInPour(order){
        this.inPour.push(order)
    }
    addInCut(order){
        this.inCut.push(order)
    }
    addInPolyr(order){
        this.inPolyr.push(order)
    }
    addInGrav(order){
        this.inGrav.push(order)
    }
    addInVol(order){
        this.inVol.push(order)
    }
    addInReady(order){
        this.inReady.push(order)
    }
    addInLoad(order){
        this.inLoad.push(order)
    }
    addInRed(order){
        this.redOrders.push(order)
    }
    addInOrange(order){
        this.orangeOrders.push(order)
    }
    addUtmPoint(index){
        this.utmPoint[index]++
    }

}

module.exports = OrdersState;
