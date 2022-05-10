const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

const bcrypt = require('bcrypt');




router.post('/login', (req, res) => {
    let user = {};

    const username = "" || req.body.username;
    const password = "" || req.body.password;

    if (username == "" || password == "") {
        res.status(401).send({ message: `Invalid Login.` });
    }
    else {
        User.findOne({
            where: {
                username: username,
            },
            raw: true
        })
            .then(data => {
                if (data) {
                    //user found with username in body
                    bcrypt.compare(password, data.password, function (err, result) {
                        if (err || !result) {
                            res.status(401).send({ message: `Invalid Login.` });
                        } else {
                            // set up token for client
                            user = {
                                id: data.id,
                                username: data.username,
                            }
                            jwt.sign({ user: user }, 'secret', { expiresIn: '1d' }, (err, token) => { res.json({ token }) });
                        }
                    });
                }
                else {
                    res.status(401).send({ message: `Invalid Login.` });
                }
            });

    }




});

module.exports = router;