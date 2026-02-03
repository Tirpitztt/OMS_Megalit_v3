module.exports = (sequelize,DataTypes)=>{
    const Termin = sequelize.define('termins',{
        orderId:{type:DataTypes.INTEGER},
        date_start:{type:DataTypes.DATEONLY},
        date_finish:{type:DataTypes.DATEONLY}
    },{timestamps:false});

    Termin.associate = Model => {
        Termin.belongsTo(Model.orders);

    }
    return Termin;
}