module.exports = (sequelize,DataTypes)=>{
    const WorkShift = sequelize.define("work_shifts",{
        userId:{
            type:DataTypes.INTEGER,
            validate:{
                notEmpty:true
            }
        },
        employerId:{
            type:DataTypes.INTEGER
        },
        date:{
            type:DataTypes.DATEONLY
        },
        start:{
            type:DataTypes.TIME
        },
        end:{
            type:DataTypes.TIME
        },
        hooky:{
            type:DataTypes.BOOLEAN
        },
        outlet:{
            type:DataTypes.BOOLEAN
        },
        absence:{
            type:DataTypes.BOOLEAN
        },
        sick:{
            type:DataTypes.BOOLEAN
        },
        rate:{
            type:DataTypes.FLOAT
        }
    },{timestamps:false})

    WorkShift.associate = Model => {
        WorkShift.belongsTo(Model.users)
        WorkShift.hasMany(Model.salarys,{
            foreignKey:'workShiftId'
        })
        WorkShift.hasMany(Model.mandates,{
            foreignKey:'workShiftId'
        })
    }

    return WorkShift
}