
class Card {
    constructor(){

    }
    setCard(card){
        this.id = card.id || 0;
        this.orderId = card.orderId || null;
        this.type = card.type || 'no';
        this.link = card.link || '';
        this.name = card.name || ''
    }
    getCard(){
        return this
    }
    getLink(){
        return this.link
    }
    getType(){
        return this.type
    }
    getID(){
        return this.id
    }
    getOrderId(){
        return this.orderId
    }

    setLink(link){
        this.link = link
    }
    setType(type){
        this.type = type
    }
    setOrderId(id){
        this.orderId = id
    }
    setName(name){
        this.name = name
    }
}

export default Card;
