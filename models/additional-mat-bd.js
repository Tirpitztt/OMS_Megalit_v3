module.exports = (sequelize,DataTypes) => {
    const AdditionalMatBetDet = sequelize.define('additional_mats',{
        betonDetailId:{type:DataTypes.INTEGER},
        materialId:{type:DataTypes.INTEGER},
        matAmount:{type:DataTypes.FLOAT},
        workOperationId:{type:DataTypes.INTEGER},
        workAmount:{type:DataTypes.FLOAT}
    },{timestamps:false});

    AdditionalMatBetDet.associate = Model => {
        AdditionalMatBetDet.belongsTo(Model.beton_details);
    }

    return AdditionalMatBetDet;
}
