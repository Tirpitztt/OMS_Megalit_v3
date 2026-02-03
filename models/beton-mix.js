module.exports = (sequelize,DataTypes)=>{
    const BetonMix = sequelize.define('beton_mixes',{
        name:{type:DataTypes.STRING},
        articul:{type:DataTypes.STRING},
        notation:{type:DataTypes.STRING},
        measure:{type:DataTypes.STRING},

    },{timestamps:false});

    BetonMix.associate = Model => {
        BetonMix.hasMany(Model.beton_ingredients,{
            foreignKey:'betonMixId'
        });
    }
    return BetonMix;
}
