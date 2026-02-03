module.exports = (sequelize,DataTypes)=>{
    const Card = sequelize.define('cards',{
        orderId:{type:DataTypes.INTEGER},
        type:{type:DataTypes.STRING},
        link:{type:DataTypes.STRING}
    },{timestamps:false});

    Card.associate = Model => {
        Card.belongsTo(Model.orders);
    }
    return Card;
}
