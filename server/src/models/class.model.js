const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("class",{
        fromDateTime:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        toDateTime:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        maxCapacity:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }

    });

    return Class;
};