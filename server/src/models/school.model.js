module.exports = (sequelize,Sequelize) => {
    const Classroom = sequelize.define("classroom",{
        description:{
            type: Sequelize.STRING
        }
    });

    return Classroom;
};