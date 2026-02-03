module.exports = (sequelize,DataTypes)=>{
    const Rate = sequelize.define('rates',{
        name:{type:DataTypes.STRING},
        USD:{type:DataTypes.FLOAT},
        EUR:{type:DataTypes.FLOAT},
        RUR:{type:DataTypes.FLOAT},
        BLR:{type:DataTypes.FLOAT}
    },{timestamps:false});
    return Rate;
}
