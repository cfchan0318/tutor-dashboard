const express = require("express");
const router = express.Router();
const classroom = require("../controllers/classroom.controller");
const auth = require("../middlewares/auth");

router.get("/", auth.verifyToken,(req,res)=>{
    classroom.findAll(req,res);
});

router.get("/:id", auth.verifyToken, (req, res) => {
    classroom.findOne(req, res);
});

router.post("/", auth.verifyToken, (req, res) => {
    classroom.create(req, res);
});

router.put('/:id', auth.verifyToken, (req, res) => {
    classroom.update(req, res);
}); 

router.delete('/:id', auth.verifyToken, (req, res) => {
    classroom.delete(req, res);
}); 

module.exports = router;