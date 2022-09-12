const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        underscored: true,  // will convert to snake case
    })

    User.beforeCreate(async (user) => {
        user.createdAt = moment().unix();
        user.updatedAt = moment().unix();
    });
    User.beforeUpdate(async (user) => {
        contact.dataValues.updatedAt = moment().unix();
    });

    User.beforeValidate(async (user) => {
        user.name = "Ahmad";
    });
    // User.afterValidate(async (user) => {
    //     user.password = hashedPassword(user.password);
    // });
    User.removeHook();
    return User;
}

