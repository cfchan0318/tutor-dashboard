const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

//request would be sent in json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Database
const db = require('./src/models');
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
//db.sequelize.sync();
//console.log(process.env.DB_HOST);


//Routes
const userRoute = require("./src/routes/users");
const loginRoute = require("./src/routes/login");
const indexRoute = require("./src/routes/index");

//Router setup
app.use('/api/users',userRoute);
app.use('/api/login',loginRoute);
app.use('/',indexRoute);


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