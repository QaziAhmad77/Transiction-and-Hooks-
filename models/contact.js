const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("contacts", {
        contactNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
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
        underscored: true,
    })

    Contact.beforeCreate(async (contact) => {
        contact.dataValues.createdAt = moment().unix();
        contact.dataValues.updatedAt = moment().unix();
    });
    Contact.beforeUpdate(async (contact) => {
        contact.dataValues.updatedAt = moment().unix();
    });
    return Contact;
}

