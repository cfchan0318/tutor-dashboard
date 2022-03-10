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
module.exports = db;