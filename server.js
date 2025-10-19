
const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoute");
require('dotenv').config();
// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ cards-api running successfully!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});