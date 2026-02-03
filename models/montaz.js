module.exports = (sequelize,DataTypes)=>{
    const Montaz = sequelize.define('montaz',{
        orderId:{type:DataTypes.INTEGER},
        height:{type:DataTypes.FLOAT},
        width:{type:DataTypes.FLOAT},
        weight:{type:DataTypes.FLOAT},
        delivery:{type:DataTypes.FLOAT},
        delivery_point:{type:DataTypes.STRING},
        guaranties:{type:DataTypes.INTEGER}
    },{timestamps:false,tableName:'montaz'});

    Montaz.associate = Model => {
        Montaz.belongsTo(Model.orders);
        Montaz.hasMany(Model.montaz_items,{
            foreignKey:'montazId'
        });

    }
    return Montaz;
}
