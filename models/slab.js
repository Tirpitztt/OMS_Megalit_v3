module.exports = (sequelize,DataTypes)=>{
    const Slab = sequelize.define('slabs',{
        stoneId:{type:DataTypes.INTEGER},
        weight:{type:DataTypes.INTEGER},
        price:{type:DataTypes.FLOAT}
    },{timestamps:false});

    Slab.associate = Model => {
        Slab.belongsTo(Model.stones)
    }


    return Slab;
}
