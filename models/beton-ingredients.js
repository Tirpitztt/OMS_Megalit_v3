module.exports = (sequelize,DataTypes)=>{
    const BetonIngredients = sequelize.define('beton_ingredients',{
        betonMixId:{type:DataTypes.INTEGER},  //???
        name:{type:DataTypes.STRING},
        materialId:{type:DataTypes.INTEGER},
        amount:{type:DataTypes.FLOAT},

    },{timestamps:false});

    BetonIngredients.associate = Model => {
        BetonIngredients.belongsTo(Model.beton_mixes);
    }
    return BetonIngredients;
}
