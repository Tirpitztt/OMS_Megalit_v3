module.exports = (sequelize,DataTypes)=>{
    const Mandat = sequelize.define('mandates',{
        workShiftId:{
            type:DataTypes.INTEGER
        },
        employerName:{
            type:DataTypes.STRING
        },
        notice:{
            type:DataTypes.STRING
        },
        summa:{
            type:DataTypes.FLOAT
        }
    },{timestamps:false})

    Mandat.associate = Model => {
        Mandat.belongsTo(Model.work_shifts)
    }

    return Mandat
}