const supportGroup = require("../Classes/supportGroup");


class History {
    constructor(orderId){
        this.orderId = orderId
        this.isEdit = false
        this.date = null
        this.employer = null
        this.number = null
        this.termin = null
        this.complects = {}
        this.complect_items = []
        this.handling = {}
        this.handling_items = {}
        this.montaz = {}
        this.montaz_items = {}
        this.cards = {}
        this.notice = {}
        this.calculation = null
        //this.setEdit = this.setEdit.bind(this)

    }
    setBaseOptions(options){
        this.date = options.date
        this.employer = {...options.employer}
    }
    setEdit(bool){
        this.isEdit = bool
    }
    setTermin(termin){
        this.isEdit = true
        this.termin = termin
    }
    setComplects(obj){
        const check = supportGroup.checkEdited(obj)
        if(check){
            this.isEdit = check
        }
        this.complects = {...obj}
    }
    setComplectItems(obj) {
        const check = supportGroup.checkEdited(obj)
        if(check){
            this.isEdit = check
        }
        this.complect_items.push(obj)
    }
    setHandling(obj){
        this.handling = {...obj}
    }
    setHandlingItems(obj){
        const check = supportGroup.checkEdited(obj)
        if(check){
            this.isEdit = check
        }
        this.handling_items = {...obj}

    }
    setMontaz(obj){
        this.montaz = {...obj}
    }
    setMontazItems(obj){
        const check = supportGroup.checkEdited(obj)
        if(check){
            this.isEdit = check
        }
        this.montaz_items = {...obj}
    }
    setCards(obj){
        const check = supportGroup.checkEdited(obj)
        if(check){
            this.isEdit = check
        }
        this.cards = {...obj}
    }
    setNotice(obj){
        //this.isEdit = true
        this.notice = {...obj}
    }
    setCalculation(obj){
        this.calculation = {...obj}
    }




}

module.exports = History




