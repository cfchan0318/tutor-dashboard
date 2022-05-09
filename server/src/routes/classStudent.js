const express = require("express");
const router = express.Router();
const classStudent = require('../controllers/class_student.controller');
const auth = require("../middlewares/auth");

/*router.get("/", auth.verifyToken,(req,res)=>{
    course.findAll(req,res);
});

router.get("/:id", auth.verifyToken, (req, res) => {
    course.findOne(req, res);
});
*/
router.post("/", auth.verifyToken, (req, res) => {
    classStudent.create(req, res);
});

router.put('/:id', auth.verifyToken, (req, res) => {
    classStudent.update(req, res);
}); 

/*router.delete('/:id', auth.verifyToken, (req, res) => {
    course.delete(req, res);
}); */

module.exports = router;