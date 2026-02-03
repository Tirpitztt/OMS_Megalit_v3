module.exports = (sequelize,DataTypes)=>{
    const MontazItem = sequelize.define('montaz_items',{
        montazId:{type:DataTypes.INTEGER},
        name:{type:DataTypes.STRING},
        category:{type:DataTypes.STRING},
        type:{type:DataTypes.STRING},
        price:{type:DataTypes.FLOAT},
        amount:{type:DataTypes.FLOAT},
        rate:{type:DataTypes.FLOAT}
    },{timestamps:false});

    MontazItem.associate = Model => {
        MontazItem.belongsTo(Model.montaz);
    }
    return MontazItem;
}
