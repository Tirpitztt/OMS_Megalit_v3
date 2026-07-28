class CheckBox {
    constructor(val){
        this.value = val
        this.checked = false

    }
    getValue(){
        return this.value
    }
    getCheck(){
        return this.checked
    }
    checkON(){
        this.checked = true
    }
    checkOFF(){
        this.checked = false
    }
}

export default CheckBox