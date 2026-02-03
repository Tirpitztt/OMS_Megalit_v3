

class GoodsBody {
    constructor(options) {
        this.name = options.name;
        this.articul = options.articul;

    }
    setName(name){
        this.name = name
    }
    getName(){
        return this.name
    }

}

export default GoodsBody
