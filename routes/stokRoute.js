// routes/stockRoute.js
const express = require("express");
const router = express.Router();
const { purchase, getAvailable, getSummary } = require("../controllers/stockController");
const authMiddleware = require("../middleware/auth");

// 🛒 تنفيذ عملية شراء
router.post("/purchase", authMiddleware, purchase);

// 📦 عرض الأكواد المتوفرة لخطة معينة
router.get("/:planId/available", getAvailable);

// 📊 ملخص الـ stock حسب الخطط
router.get("/summary", getSummary);

module.exports = router;
