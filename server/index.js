const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;


require("dotenv").config();

//request would be sent in json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Database
const db = require('./src/models');

/*
db.sequelize.sync({ force: true }).then(() => {

    //create default admin user
    console.log("Drop and re-sync db.");
    const admin = {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
    };

    bcrypt.hash(admin.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        db.users.findOrCreate({
            where: { username: admin.username },
            defaults: {
                password: hash,
            }
        })
    });
});
*/




db.sequelize.sync()
    .then(() => {

        const admin = {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        };

        bcrypt.hash(admin.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            db.users.findOrCreate({
                where: { username: admin.username },
                defaults: {
                    password: hash,
                }
            })
        });

    });

console.log(process.env.DB_HOST);


//Routes
const indexRoute = require("./src/routes/index");
const authRoute = require("./src/routes/auth");

//Routes - Entities
const userRoute = require("./src/routes/users");
const schoolRoute = require("./src/routes/schools");
const classroomRoute = require("./src/routes/classrooms");
const subjectRoute = require("./src/routes/subjects");
const studentRoute = require("./src/routes/student");
const courseRoute = require("./src/routes/courses");
const classRoute = require("./src/routes/classes");
const classStudentRoute = require('./src/routes/classStudent');

//Router setup
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/schools',schoolRoute);
app.use('/api/classrooms',classroomRoute);
app.use('/api/subjects', subjectRoute);
app.use('/api/students', studentRoute);
app.use('/api/courses', courseRoute);
app.use('/api/classes', classRoute);
app.use('/api/classStudents', classStudentRoute);


app.use('/', indexRoute);


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(path.resolve(__dirname, '../client/build', 'index.html'));
    console.log(`Server listening on ${PORT}`);
});

