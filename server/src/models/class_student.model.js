const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const ClassStudent = sequelize.define("class_student",{
        
        hasPayment:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        paymentRef: {
            type: DataTypes.STRING,
        }

    });

    return ClassStudent;
};