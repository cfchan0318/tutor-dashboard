const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post('/', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'alice',
        email: 'alice@alice.a'
    };

    jwt.sign({ user: user }, 'secret',{expiresIn:'1d'}, (err, token) => {
        res.json({
            token
        })
    });
});

module.exports = router;