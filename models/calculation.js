module.exports = (sequelize,DataTypes)=>{
    const Calculation = sequelize.define('calculations',{
        orderId:{type:DataTypes.INTEGER},
        total_cost:{type:DataTypes.FLOAT},
        balance:{type:DataTypes.FLOAT},
        discount:{type:DataTypes.FLOAT},
        rate:{type:DataTypes.FLOAT}
    },{timestamps:false});

    Calculation.associate = Model => {
        Calculation.belongsTo(Model.orders,{
            onDelete:'cascade'
        });
        Calculation.hasMany(Model.payments,{
            foreignKey:'calculationId',
            onDelete:'cascade',
            hooks:true
        });

    }
    return Calculation;
}