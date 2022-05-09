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
db.users = require("./user.model")(sequelize, Sequelize);
db.schools = require("./school.model")(sequelize, Sequelize);
db.classrooms = require("./classroom.model")(sequelize, Sequelize);
db.subjects = require("./subject.model")(sequelize, Sequelize);
db.students = require("./student/student.model")(sequelize, Sequelize);
db.courses = require("./course.model")(sequelize, Sequelize);
db.classes = require("./class.model")(sequelize, Sequelize);
db.ClassStudent = require("./class_student.model")(sequelize, Sequelize);

//Relations - schools classrooms 1 to many
db.schools.hasMany(db.classrooms, { as: 'classrooms' });
db.classrooms.belongsTo(db.schools, {
    foreignKey: "schoolId",
    as: "school",
});

//Relation - subject_course - 1-M
db.subjects.hasMany(db.courses);
db.courses.belongsTo(db.subjects);
module.exports = db;

//Relation - course class - 1-M
db.courses.hasMany(db.classes);
db.classes.belongsTo(db.courses);

//Relation -  classroom class - 1-M
db.classrooms.hasMany(db.classes);
db.classes.belongsTo(db.classrooms);

//Relation - class - student - M-M
db.classes.belongsToMany(db.students, {
    through: db.ClassStudent,
    as: "students",
    foreignKey: "class_id",
});

db.students.belongsToMany(db.classes, {
    through: db.ClassStudent,
    as: "classes",
    foreignKey: "student_id"
});