const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        username : req.body.username,
        password: req.body.password
    };

    User.create(user)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "error"
            });
        });
};