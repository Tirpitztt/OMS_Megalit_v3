module.exports = (sequelize,DataTypes)=>{
    const Stone = sequelize.define('stones',{
        name:{type:DataTypes.STRING},
        country:{type:DataTypes.STRING},
        color:{type:DataTypes.STRING},
        ratio:{type:DataTypes.FLOAT}
    },{timestamps:false});

    Stone.associate = Model => {
        Stone.hasMany(Model.slabs,{
            foreignKey:'stoneId',
            onDelete:'cascade'
        })
        Stone.hasMany(Model.blocks,{
            foreignKey:'stoneId',
            onDelete:'cascade'
        })
    }

    return Stone;
}
