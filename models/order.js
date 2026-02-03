module.exports = (sequelize,DataTypes)=>{
    const Order = sequelize.define('orders',{
        customerId:{type:DataTypes.INTEGER},
        employerId:{type:DataTypes.INTEGER},
        employerName:{type:DataTypes.STRING},
        number:{type:DataTypes.INTEGER},
        maker:{type:DataTypes.STRING},
        status:{type:DataTypes.STRING},
        notice:{type:DataTypes.STRING},
        utm:{type:DataTypes.INTEGER}
    },{timestamps:false});

    Order.associate = Model => {
        Order.belongsTo(Model.customers);
        Order.hasMany(Model.complects,{
            foreignKey:'orderId',
            onDelete:'cascade'
        });
        Order.hasOne(Model.handlings,{
            foreignKey:'orderId',
            onDelete:'cascade'
        });
        Order.hasOne(Model.montaz,{
            foreignKey:'orderId',
            onDelete:'cascade'
        });
        Order.hasOne(Model.termins,{
            foreignKey:'orderId',
            onDelete:'cascade'
        });
        Order.hasOne(Model.calculations,{
            foreignKey:'orderId',
            onDelete:'cascade',
            hooks:true
        });
        Order.hasMany(Model.edited_historys,{
            foreignKey:'orderId',
            onDelete:'cascade'
        });
        Order.hasMany(Model.cards,{
            foreignKey:'orderId',
            onDelete:'cascade'
        })
    }
    return Order;
}
