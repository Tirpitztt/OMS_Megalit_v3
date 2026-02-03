module.exports = (sequelize,DataTypes)=>{
    const EditedHistory = sequelize.define('edited_historys',{
        orderId:{type:DataTypes.INTEGER},
        employerId:{type:DataTypes.INTEGER},
        data:{type:DataTypes.STRING},

    },{timestamps:true});

    EditedHistory.associate = Model => {
        EditedHistory.belongsTo(Model.orders)
    }
    return EditedHistory;
}
