

class WorkShift {
    constructor(userId,year,month,day) {
        this.userId = userId
        this.year = year
        this.month = month
        this.day = day
        this.shiftId = null
        this.data = {
            employerId:1,
            date:this.year + '-' + this.month + '-' + this.day,
            start:null,
            end:null,
            hooky:false,
            outlet:false,
            absence:false,
            sick:false,
            full:true,
            rate:null,
            mandat:null,
            salary:[]

        }
    }
    setShiftId(id){
        this.shiftId = id
    }
    setEmployer(id){
        this.data.employerId = id
    }
    setStartTime(time){
        this.data.start = time
    }
    setEndTime(time){
        this.data.end = time
    }
    setHooky(bool){
        this.data.hooky = bool
    }
    setOutlet(bool){
        this.data.outlet = bool
    }
    setAbsence(bool){
        this.data.absence = bool
    }
    setSick(bool){
        this.data.sick = bool
    }
    setFull(bool){
        this.data.full = bool
    }
    setRate(rate){
        this.data.rate = rate
    }
}

export default WorkShift;