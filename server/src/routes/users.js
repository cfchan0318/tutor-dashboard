const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.get("/:id", auth.verifyToken, (req, res) => {
    user.findOne(req, res);
});

//User auth sample
router.post("/", auth.verifyToken, (req, res) => {
    user.create(req, res);
});

router.put('/:id', auth.verifyToken, (req, res) => {
    user.update(req, res);
}); 

router.delete('/:id', auth.verifyToken, (req, res) => {
    user.delete(req, res);
}); 

module.exports = router;