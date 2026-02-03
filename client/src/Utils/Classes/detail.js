

class Detail {
    constructor() {

    }
    setDetail(detail){
        this.ind = detail.ind || 0;
        this.id = detail.id || 0;
        this.category = detail.category || 'no category';
        this.name = detail.name || 'no name';
        this.articul = detail.articul || 'no articul';
        this.type = detail.type || 'no type';
        this.sort = detail.sort || 'B';
        this.material = detail.material || 'no mat';
        this.color = detail.color || 'no color'
        this.measure = detail.measure || 'шт';
        this.status = detail.status || 'ordered';
        this.local = detail.local || 'not found';
        this.height = detail.height || 0;
        this.width = detail.width || 0;
        this.weight = detail.weight || 0;
        this.price = detail.price || 0;
        this.amount = detail.amount || 0;// добавить курс

    }
    getDetail(){
        return this
    }

    getSqr(){
        return  ((this.height * this.width) * 2) +
                ((this.width * this.weight) * 2) +
                ((this.height * this.weight) * 2)

    }
    getCost(){
        return this.price * this.amount
    }
}

export default Detail;
