const express = require('express');
const router = express.Router();
const Student = require('../controllers/student.controller');
const auth = require("../middlewares/auth");

router.post("/", auth.verifyToken, (req, res) => { 
    Student.create(req, res);
});

router.get("/:id", auth.verifyToken, (req, res) => {
    Student.findOne(req, res);
});

router.get("/", auth.verifyToken, (req, res) => {
    Student.findAll(req, res);
});

router.put("/:id", auth.verifyToken, (req, res) => {
    Student.update(req, res);
});

router.delete("/:id", auth.verifyToken, (req, res) => {
    Student.delete(req, res);
})


module.exports = router;