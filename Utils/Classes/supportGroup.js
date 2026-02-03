
class SupportGroup {
    checkEdited(obj){
        if(obj.added.length || obj.deleted.length){
            return true
        }

    }
}

module.exports = new SupportGroup()
