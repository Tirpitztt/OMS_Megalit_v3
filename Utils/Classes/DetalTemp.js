
class DetalTemp {
    constructor(number,id,name,price,height,width,weight,rate) {
        this.ind = number
        this.id = id
        this.name = name
        this.articul = ''
        this.type = ''
        this.sort = 'В'
        this.material = 'габбро'
        this.status = 'no'
        this.local = 'sklad'
        this.height = height
        this.width = width
        this.weight = weight
        this.price = price
        this.amount = 1
        this.rate = rate
    }
    getDetal(){
        return this
    }
    setHeight(height){
        this.height = height
    }
    setWidth(width){
        this.width = width
    }
    setPrice(price){
        this.price = price
    }

}

module.exports = DetalTemp;
