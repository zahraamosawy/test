const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");




router.post("/login", (req, res) => {
  const { name, phone } = req.body;
  const token = userController.login(name, phone);

  if (!token) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ token });
});

router.get('/me', authMiddleware, (req, res) => {
  const user = userController.getCurrentUser(req.user.name);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

module.exports = router;
