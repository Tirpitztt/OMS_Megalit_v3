module.exports = (sequelize,DataTypes)=>{
    const Customer = sequelize.define('customers',{
        name:{type:DataTypes.STRING},
        last_name:{type:DataTypes.STRING},
        father_name:{type:DataTypes.STRING},
        address:{type:DataTypes.STRING},
        phone:{type:DataTypes.STRING},
        rank:{type:DataTypes.STRING},
        full_name:{
            type:DataTypes.VIRTUAL,
            get() {
                return `${this.last_name} ${this.name} ${this.father_name}`;
            }
        }
    },{timestamps:false});

    Customer.associate = Model => {
        Customer.hasMany(Model.orders,{
            foreignKey:'customerId'
        });

    }
    return Customer;
}