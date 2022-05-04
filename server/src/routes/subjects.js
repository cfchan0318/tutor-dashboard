const express = require("express");
const router = express.Router();
const subject = require("../controllers/subject.controller");
const auth = require("../middlewares/auth");

router.get("/", auth.verifyToken,(req,res)=>{
    subject.findAll(req,res);
});

router.get("/:id", auth.verifyToken, (req, res) => {
    subject.findOne(req, res);
});

router.post("/", auth.verifyToken, (req, res) => {
    subject.create(req, res);
});

router.put('/:id', auth.verifyToken, (req, res) => {
    subject.update(req, res);
}); 

router.delete('/:id', auth.verifyToken, (req, res) => {
    subject.delete(req, res);
}); 

module.exports = router;