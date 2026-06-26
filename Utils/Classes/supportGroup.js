//import {DETAIL_TYPE_OF_FLOOR, DETAIL_TYPE_OF_MONUMENT} from "../const_variables";
const {DETAIL_TYPE_OF_FLOOR, DETAIL_TYPE_OF_MONUMENT} = require('../const_variables')

class SupportGroup {
    checkEdited(obj){
        if(obj.added.length || obj.deleted.length){
            return true
        }

    }
    getKeyOfWorkOperation(id){
        switch(id){
            case '1':{return DETAIL_TYPE_OF_MONUMENT}
            case '2':{return DETAIL_TYPE_OF_FLOOR}
            default:return []
        }
    }
}

module.exports = new SupportGroup()
