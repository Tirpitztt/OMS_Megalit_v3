module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define('users',{
        login:{
            type:DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        name:{
            type:DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        last_name:{
            type:DataTypes.STRING,
        },
        father_name:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING
        },
        role:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING,

        },
        date_accept: {
            type: DataTypes.DATEONLY
        },
        settings:{
            type:DataTypes.STRING
        },
        department:{
            type:DataTypes.STRING
        },
        position: {
            type: DataTypes.STRING
        },
        full_name:{
            type:DataTypes.VIRTUAL,
            get() {
                return `${this.last_name} ${this.name} ${this.father_name}`;
            }
        }
    }, { timestamps: false });

    User.associate = Model => {
        User.hasMany(Model.work_shifts,{
            foreignKey:'userId'
        })
    }

    return User;
}
