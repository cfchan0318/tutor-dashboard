const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.get("/",auth.verifyToken,(req,res) =>{
    res.json({
        message: "get users"
    });
});

//User auth sample
router.post("/", auth.verifyToken, (req, res) => {
    user.create(req,res);
});

router.put('/',auth.verifyToken,(req,res) =>{
    res.json({
        message: "update users"
    });
});

router.delete('/',auth.verifyToken,(req,res) =>{
    res.json({
        message: "delete user with id: "
    });
});

module.exports = router;