module.exports = (sequelize,DataTypes) => {
    const Salary = sequelize.define('salarys',{
        workShiftId:{
            type:DataTypes.INTEGER
        },
        workId:{
          type:DataTypes.INTEGER
        },
        workName:{
            type:DataTypes.STRING
        },
        cost:{
            type:DataTypes.FLOAT
        },
        amount:{
            type:DataTypes.FLOAT
        },
        summa:{
            type:DataTypes.FLOAT
        },

    },{timestamps:false})

    Salary.associate = Model => {
        Salary.belongsTo(Model.work_shifts)
    }

    return Salary
}