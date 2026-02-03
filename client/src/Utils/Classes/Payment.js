

class Payment {
    constructor(today) {
        this.id = null
        this.calculationId = null
        this.summa = 0
        this.summaBlr = 0
        this.pay_date = today
        this.employerId = null
        this.employerName = null
        this.cash = false
    }

    setCalculationId(id){
        this.calculationId = id
    }
    setSumma(usd,blr){
        this.summa = usd
        this.summaBlr = blr
    }
    setEmployer(user){
        this.employerId = user.id
        this.employerName = user.name
    }
    setCash(bool){
        this.cash = bool
    }

}

module.exports = Payment
