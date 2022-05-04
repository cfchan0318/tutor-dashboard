const express = require("express");
const router = express.Router();
const school = require("../controllers/school.controller");
const auth = require("../middlewares/auth");

router.get("/", auth.verifyToken,(req,res)=>{
    school.findAll(req,res);
});

router.get("/:id", auth.verifyToken, (req, res) => {
    school.findOne(req, res);
});

router.post("/", auth.verifyToken, (req, res) => {
    school.create(req, res);
});

router.put('/:id', auth.verifyToken, (req, res) => {
    school.update(req, res);
}); 

router.delete('/:id', auth.verifyToken, (req, res) => {
    school.delete(req, res);
}); 

module.exports = router;