module.exports = (sequelize,DataTypes)=>{
    const ComplectItem = sequelize.define('complect_items',{
        complectId:{type:DataTypes.INTEGER},
        name:{type:DataTypes.STRING},
        articul:{type:DataTypes.STRING},
        type:{type:DataTypes.STRING},
        sort:{type:DataTypes.STRING},
        material:{type:DataTypes.STRING},
        status:{type:DataTypes.STRING},
        local:{type:DataTypes.STRING},
        height:{type:DataTypes.FLOAT},
        width:{type:DataTypes.FLOAT},
        weight:{type:DataTypes.FLOAT},
        price:{type:DataTypes.FLOAT},
        amount:{type:DataTypes.FLOAT},
        rate:{type:DataTypes.FLOAT}
    },{timestamps:false});

    ComplectItem.associate = Model => {
        ComplectItem.belongsTo(Model.complects);
        }
    return ComplectItem;
}
