module.exports = (sequelize,Sequelize) => {
    const CourseSet = sequelize.define("courseSet",{
        description:{
            type: Sequelize.STRING
        }
    });

    return CourseSet;
};