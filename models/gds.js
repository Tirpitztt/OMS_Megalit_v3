module.exports = (sequelize,DataTypes) => {
    const Gds = sequelize.define('goods',{
        name:{type:DataTypes.STRING},
        category:{type:DataTypes.STRING},
        type:{type:DataTypes.STRING},
        articul:{type:DataTypes.STRING},
        sort:{type:DataTypes.STRING},
        material:{type:DataTypes.STRING},
        color:{type:DataTypes.STRING},
        measure:{type:DataTypes.STRING},
        status:{type:DataTypes.STRING},
        local:{type:DataTypes.STRING},
        height:{type:DataTypes.FLOAT},
        width:{type:DataTypes.FLOAT},
        weight:{type:DataTypes.FLOAT},
        price:{type:DataTypes.FLOAT},
        amount:{type:DataTypes.INTEGER}
    },{timestamps:false});



    return Gds;
}
