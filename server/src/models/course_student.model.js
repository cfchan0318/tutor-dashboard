const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const CourseStudent = sequelize.define("course_student",{
        
        hasPayment:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        paymentRef: {
            type: DataTypes.STRING,
        }

    });

    return CourseStudent;
};