const express = require("express");
const router = express.Router();
const courseStudent = require('../controllers/course_student.controller');
const auth = require("../middlewares/auth");

router.get("/", auth.verifyToken,(req,res)=>{
    courseStudent.findAll(req,res);
});

router.get("/:id", auth.verifyToken, (req, res) => {
    //courseStudent.findOne(req, res);
});

router.post("/", auth.verifyToken, (req, res) => {
    courseStudent.create(req, res);
});

router.put('/', auth.verifyToken, (req, res) => {
    courseStudent.update(req, res);
}); 

router.delete('/', auth.verifyToken, (req, res) => {
    courseStudent.delete(req, res);
}); 

module.exports = router;