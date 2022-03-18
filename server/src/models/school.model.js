module.exports = (sequelize,Sequelize) => {
    const School = sequelize.define("school",{
        description:{
            type: Sequelize.STRING
        }
    });

    return School;
};