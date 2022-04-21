module.exports = (sequelize,Sequelize) => {
    const Course = sequelize.define("course",{
        description:{
            type: Sequelize.STRING
        }
    });

    return Course;
};