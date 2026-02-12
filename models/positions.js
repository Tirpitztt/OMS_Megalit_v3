module.exports = (sequelize, DataTypes) => {
    const Position = sequelize.define('work_positions', {
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
            foreignKey:'work_position_id'
        })
    }

    return Position
}