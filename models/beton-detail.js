module.exports = (sequelize,DataTypes) => {
    const BetonDetail = sequelize.define('beton_details',{
        name:{type:DataTypes.STRING},
        category:{type:DataTypes.STRING},
        articul:{type:DataTypes.STRING},
        height:{type:DataTypes.FLOAT},
        width:{type:DataTypes.FLOAT},
        weight:{type:DataTypes.FLOAT},
        V:{type:DataTypes.FLOAT},
        S:{type:DataTypes.FLOAT},
        betmixID:{type:DataTypes.INTEGER},
        markup:{type:DataTypes.FLOAT},
        added_cost:{type:DataTypes.FLOAT},
        amount:{type:DataTypes.INTEGER}
    },{timestamps:false});

    BetonDetail.associate = Model => {
        BetonDetail.hasMany(Model.additional_mats,{
            foreignKey:'betonDetailId'
        })
    }

    return BetonDetail;
}
