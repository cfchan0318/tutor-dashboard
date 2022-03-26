module.exports = (sequelize,Sequelize) => {
    const Subject = sequelize.define("subject",{
        description:{
            type: Sequelize.STRING
        }
    });

    return Subject;
};