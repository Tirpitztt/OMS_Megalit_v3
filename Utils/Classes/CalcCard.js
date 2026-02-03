
class CalcCard {
    constructor() {
        this.totalCost = 0;
        this.avanses = 0;
        this.balance = 0;
        this.paymentCash = 0;
        this.paymentBank = 0;
        this.receivable = 0;
        this.orders = [];
        this.bazaShopTotal = 0;
        this.bazaShopCount = 0;
        this.bazaShopBalance = 0;
        this.sovietShopTotal = 0;
        this.sovietShopCount = 0;
        this.sovietShopBalance = 0;
        this.prestizShopTotal = 0;
        this.prestizShopCount = 0;
        this.prestizShopBalance = 0;
        this.baniaShopTotal = 0;
        this.baniaShopCount = 0;
        this.baniaShopBalance = 0;
    }

    setTotal(total){
        this.totalCost = total;
    }
    setBazaTotal(total){
        this.bazaShopTotal += total
    }
    setBazaCount(){
        this.bazaShopCount++
    }
    setBazaBalance(balance){
        this.bazaShopBalance += balance
    }
    setSovietTotal(total){
        this.sovietShopTotal += total;
    }
    setSovietCount(){
        this.sovietShopCount++
    }
    setSovietBalance(balance){
       this.sovietShopBalance += balance;
    }
    setPrestizTotal(total){
        this.prestizShopTotal += total;
    }
    setPrestizCount(){
        this.prestizShopCount++
    }
    setPrestizBalance(balance){
        this.prestizShopBalance += balance;
    }
    setBaniaTotal(total){
        this.baniaShopTotal += total
    }
    setBaniaCount(){
        this.baniaShopCount++
    }
    setBaniaBalance(balance){
        this.baniaShopBalance += balance;
    }
    setAvans(avanse){
        this.avanses = avanse;
    }
    setBalance(balance){
        this.balance = balance;
    }
    setPaymentCash(pay){
        this.paymentCash = pay
    }
    setPaymentBank(pay){
        this.paymentBank = pay
    }
    setReceivable(pay){
        this.receivable = pay
    }
    setOrders(orders){
        this.orders = [...orders]
    }
    getTotal(){
        return this.totalCost
    }
    getAvance(){
        return this.paymentBank + this.paymentCash
    }
    getBalance(){
        return this.balance
    }
    getPaymentCash(){
        return this.paymentCash
    }
    getPaymentBank(){
        return this.paymentBank
    }
    getReceivable(){
        return this.receivable
    }

}

module.exports = CalcCard;
