const Sequelize = require("sequelize");
const DT = Sequelize.DataTypes;

module.exports = {
    user: {
        username: {
            type: DT.STRING(50),
            allowNull: false,
            unique: true
        },
        email: {
            type: DT.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DT.STRING(50),
            allowNull: true,
            unique: true
        }
    }
};