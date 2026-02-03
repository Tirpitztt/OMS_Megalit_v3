module.exports = (sequelize,DataTypes)=>{
    const HandlingItem = sequelize.define('handling_items',{
        handlingId:{type:DataTypes.INTEGER},
        name:{type:DataTypes.STRING},
        category:{type:DataTypes.STRING},
        size:{type:DataTypes.STRING},
        price:{type:DataTypes.FLOAT},
        amount:{type:DataTypes.FLOAT},
        rate:{type:DataTypes.FLOAT}
    },{timestamps:false});

    HandlingItem.associate = Model => {
        HandlingItem.belongsTo(Model.handlings);
    }
    return HandlingItem;
}
