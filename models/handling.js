module.exports = (sequelize,DataTypes)=>{
    const Handling = sequelize.define('handlings',{
        orderId:{type:DataTypes.INTEGER},
        hydrophob:{type:DataTypes.BOOLEAN},
        sketch_path:{type:DataTypes.STRING},
        text_grav:{type:DataTypes.STRING}
    },{timestamps:false});

    Handling.associate = Model => {
        Handling.belongsTo(Model.orders);
        Handling.hasMany(Model.handling_items,{
            foreignKey:'handlingId'
        });

    }
    return Handling;
}