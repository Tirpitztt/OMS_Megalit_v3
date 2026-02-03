module.exports = (sequelize,DataTypes)=>{
    const Block = sequelize.define('blocks',{
        stoneId:{type:DataTypes.INTEGER},
        weight:{type:DataTypes.STRING},
        price:{type:DataTypes.FLOAT}
    },{timestamps:false});

    Block.associate = Model => {
        Block.belongsTo(Model.stones)
    }

    return Block;
}
