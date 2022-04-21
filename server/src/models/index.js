const dbConfig = require("../configs/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.users = require("./user.model")(sequelize,Sequelize);
db.schools = require("./school.model")(sequelize,Sequelize);
db.classrooms = require("./classroom.model")(sequelize,Sequelize);
db.subjects = require("./subject.model")(sequelize, Sequelize);
db.students = require("./student/student.model")(sequelize, Sequelize);
db.courses = require("./course.model")(sequelize, Sequelize);

//Relations - schools classrooms 1 to many
db.schools.hasMany(db.classrooms,{as:'classrooms'});
db.classrooms.belongsTo(db.schools,{
    foreignKey:"schoolId",
    as : "school",
});

//Relation - one course has one subject
db.courses.belongsTo(db.subjects);
module.exports = db;