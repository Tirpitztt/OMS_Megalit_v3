

class UserSettings {

    constructor(settings) {
        this.avatar = 'https://elasticbeanstalk-eu-central-1-512346490374.s3.eu-central-1.amazonaws.com/megalitResourses/avatars/smile1.png'
        this.dbView = 0
        this.phone = ''
        this.workPhone = ''
        this.adress = ''
    }

    setSettings(settings){
        if('avatar' in settings){
            this.avatar = settings.avatar
        }
        if('dbView' in settings){
            this.dbView = 0 || settings.dbView
        }
        if('phone' in settings){
            this.phone = '' || settings.phone
        }
        if('workPhone' in settings){
            this.workPhone = settings.workPhone
        }
        if('adress' in settings){
            this.adress = settings.adress
        }
    }

}

module.exports = UserSettings
