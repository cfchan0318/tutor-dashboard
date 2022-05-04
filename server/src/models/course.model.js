module.exports = (sequelize,Sequelize) => {
    const Course = sequelize.define("course",{
        description:{
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
        }
    });

    return Course;
};