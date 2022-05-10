const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get("/api",auth.verifyToken, (req, res) => {
    res.json({ message: "Hello from server!" });
  });

module.exports = router;