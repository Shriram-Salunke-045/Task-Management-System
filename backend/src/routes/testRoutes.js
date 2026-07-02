const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user
  });
});

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin!"
    });
  }
);

module.exports = router;