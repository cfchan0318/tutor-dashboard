module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        studentNumber: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        chineseName: {
            type: Sequelize.STRING
        },
        sex: {
            type: Sequelize.STRING,
            validate: { isIn: [['M', 'F']] }
        },
        birthday: {
            type: Sequelize.DATEONLY
        },
        hkid: {
            type: Sequelize.STRING
        },
        address: {
            type:Sequelize.STRING
        },
        joinDate: {
            type: Sequelize.DATEONLY,
            defaultValue: new Date(),
        }
    });

    return Student;
};