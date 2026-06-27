class SalaryCalculateBody {
    constructor(){
        this.workOperationID = 0
        this.workOperationName = ''
        this.workOperationNotice = ''
        this.workShopID = 0
        this.workOperationCost = 0
        this.workOperationAmount = 0
        this.workOperationSumma = 0
    }
    setOperationTitle(id,name){
        this.workOperationID = id
        this.workOperationName = name
    }
    setOperationCost(cost){
        this.workOperationCost = cost
    }
    setOperationAmount(num){
        this.workOperationAmount = num
    }
    setOperationSumma(){
        this.workOperationSumma = this.workOperationAmount * this.workOperationCost
    }
}

export default SalaryCalculateBody