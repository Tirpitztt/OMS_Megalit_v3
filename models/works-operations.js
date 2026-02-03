module.exports = (sequelize,DataTypes)=>{
    const WorkOperations = sequelize.define('work_operations',{
        type:{type:DataTypes.STRING},
        name:{type:DataTypes.STRING},
        measure:{type:DataTypes.STRING},
        stavka:{type:DataTypes.FLOAT},
        bonus:{type:DataTypes.FLOAT},
        USD:{type:DataTypes.FLOAT},
        BLR:{type:DataTypes.FLOAT}

    },{timestamps:true});


    return WorkOperations;
}
