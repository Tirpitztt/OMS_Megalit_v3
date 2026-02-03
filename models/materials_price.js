module.exports = (sequelize,DataTypes)=>{
    const MaterialsPrice = sequelize.define('materials_price',{
        name:{type:DataTypes.STRING},
        country:{type:DataTypes.STRING},
        color:{type:DataTypes.STRING},
        t_2:{type:DataTypes.FLOAT},
        t_3:{type:DataTypes.FLOAT},
        t_5:{type:DataTypes.FLOAT},
        t_8:{type:DataTypes.FLOAT},
        t_10:{type:DataTypes.FLOAT},
        t_12:{type:DataTypes.FLOAT},
        t_15:{type:DataTypes.FLOAT},
        t_20:{type:DataTypes.FLOAT},
        t_25:{type:DataTypes.FLOAT},
        t_30:{type:DataTypes.FLOAT},

    },{timestamps:false});
    return MaterialsPrice;
}