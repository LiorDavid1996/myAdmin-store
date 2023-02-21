const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");


const sumRouter = require("./router/sumRouter");
const orderRouter = require("./router/orderRouter");
const ordersModel = require("./model/ordersModel");

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const db = require("./DB");
const { summaryEveryTwentyFourHours } = require("./controler/summary");
app.use("/orders", orderRouter);
app.use("/sum", sumRouter);
// setInterval(()=>summaryEveryTwentyFourHours(),(3000))
// summaryEveryTwentyFourHours()
// setInterval(()=>createUser(),15000)


app.get("/", (req, res) => {
  res.send({ massage: "success" });
});

app.listen(port, () => {
  console.log(`server is ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}
