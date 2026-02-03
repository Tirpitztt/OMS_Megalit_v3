


class Dater {
    constructor() {
        this.today = new Date()
        this.today2 = new Date()
        this.addedMounth = this.today2.setDate(this.today2.getDate()+30)
    }

    redDate(date){
        return(Date.parse(date) < this.today)
    }
    orangeDate(date){
        return(Date.parse(date) > this.today && Date.parse(date) < this.addedMounth)
    }

}

module.exports = new Dater()
