module.exports = (sequelize, DataTypes) => {
    const Position = sequelize.define('positions', {
        department: {
            type: DataTypes.STRING,
        },
        work_shop: {
            type: DataTypes.STRING,
        },
        position_name: {
            type: DataTypes.STRING,
        }

    }, { timestamps: false })
    Position.associate = Model => {
        Position.hasMany(Model.users, {
            foreignKey:'positionId'
        })
    }

    return Position
}