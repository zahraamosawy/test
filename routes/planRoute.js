
const express = require("express");
const router = express.Router();
const plans = require("../db/plans.json");

// GET /plans
router.get("/", (req, res) => res.json(plans));

// GET /plans/:id
router.get("/:id", (req, res) => {
  const plan = plans.find(p => p.id === Number(req.params.id));
  if (!plan) return res.status(404).json({ error: "Plan not found" });
  res.json(plan);
});


module.exports = router;