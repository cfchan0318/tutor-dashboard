const express = require("express");
const router = express.Router();
const Class = require("../controllers/class.controller");
const auth = require("../middlewares/auth");

router.get("/", auth.verifyToken,(req,res)=>{
    Class.findAll(req,res);
});

router.get("/:id", auth.verifyToken, (req, res) => {
    Class.findOne(req, res);
});

router.post("/", auth.verifyToken, (req, res) => {
    Class.create(req, res);
});

router.put('/:id', auth.verifyToken, (req, res) => {
    Class.update(req, res);
}); 

router.delete('/:id', auth.verifyToken, (req, res) => {
    Class.delete(req, res);
}); 

module.exports = router;