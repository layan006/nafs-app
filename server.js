const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NAFS server is alive ✔");
});

app.post("/ask", (req, res) => {
  console.log("ASK HIT ✔");

  res.json({
    reply: "Backend is working ✔"
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});