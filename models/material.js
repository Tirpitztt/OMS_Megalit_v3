module.exports = (sequelize,DataTypes)=>{
    const Material = sequelize.define('materials',{
        name:{type:DataTypes.STRING},
        measure:{type:DataTypes.STRING},
        RUR:{type:DataTypes.FLOAT},
        USD:{type:DataTypes.FLOAT},
        BLR:{type:DataTypes.FLOAT}
    },{timestamps:true});
    return Material;
}
