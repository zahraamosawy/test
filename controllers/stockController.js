// controllers/stockController.js
const users = require("../db/users.json");
const plans = require("../db/plans.json");
const stock = require("../db/stock.json");
var jwt = require("jsonwebtoken");


// 🟢 شراء خطة
const purchase = (req, res) => {
  const { planId } = req.body;
  console.log(req.body);
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return res.status(400).json({ error: "Invalid plan" });
 
  const user = req.user;
  console.log("test", user);
  if (user.balance < plan.price)
    return res.status(400).json({ error: "Insufficient balance" });

  const item = stock.find((s) => s.planId === planId && s.status === "ready");
  if (!item) return res.status(400).json({ error: "Out of stock" });

  // ✅ تحديث الحالة والرصيد
  item.status = "sold";
  user.balance -= plan.price;

  res.json({
    message: "Purchase successful",
    plan,
    code: item.code,
    newBalance: user.balance,
  });
};

// 🟢 عرض المتاح من stock
const getAvailable = (req, res) => {
  const { planId } = req.params;
  console.log(req.params);
  const available = stock
    .filter((s) => s.planId === parseInt(planId) && s.status === "ready")
    .map((s) => ({
      id: s.id,
      code: "***" + s.code.slice(-4),
      status: s.status,
    }));
  res.json(available);
  //console.log(available);
};

// 🟢 ملخص الـ stock حسب الخطة
const getSummary = (req, res) => {
  const summary = plans.map((p) => {
    const related = stock.filter((s) => s.planId === p.id);
    return {
      planId: p.id,
      title: p.title,
      ready: related.filter((s) => s.status === "ready").length,
      sold: related.filter((s) => s.status === "sold").length,
      error: related.filter((s) => s.status === "error").length,
    };
  });
  res.json(summary);
  //console.log(summary);
};
module.exports = {
  purchase,
  getAvailable,
  getSummary,
};