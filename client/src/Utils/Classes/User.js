
class User {
    constructor() {
        this.id = 0
        this.login = ''
        this.name = ''
        this.lastName = ''
        this.fatherName = ''
        this.email = ''
        this.role = ''
        this.fullName = ''
        this.password = ''
        this.dateAccept = ''
        this.settings = {

        }
    }
    setUser(user) {
        this.id = user.id
        this.login = user.login
        this.name = user.name
        this.lastName = user.lastName
        this.fatherName = user.fatherName
        this.email = user.email
        this.role = user.role
        this.fullName = user.fullName
        this.dateAccept = user.dateAccept
        this.settings = {...user.settings}
    }
}

export default User;
