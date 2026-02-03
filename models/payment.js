module.exports = (sequelize,DataTypes)=>{
    const Payment = sequelize.define('payments',{
        calculationId:{type:DataTypes.INTEGER},
        summa:{type:DataTypes.FLOAT},
        summaBlr:{type:DataTypes.FLOAT},
        pay_date:{type:DataTypes.DATEONLY},
        employerId:{type:DataTypes.INTEGER},
        employerName:{type:DataTypes.STRING},
        cash:{type:DataTypes.BOOLEAN}
    },{timestamps:false});

    Payment.associate = Model => {
        Payment.belongsTo(Model.calculations);
    }
    return Payment;
}