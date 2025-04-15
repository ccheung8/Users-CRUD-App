import express from "express";
import dotenv from "dotenv";

import { addTimestamp, verifyToken } from "./middlewares/index.js";
import Router from "./routes/index.js";

// setting up env from .env
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// global middlewares
app.use(addTimestamp);  // adds .timestamp to req object
app.use(express.json());  // can use .body in req object in post request
app.use(express.static("public"));  // specifies root dir and serves file
app.use("/api", Router);

app.get("/health", (req, res) => {
    console.log(req);
    res.send({
      checkedHealthAt: req.timestamp,
      msg: "OK"
    });
  }
)

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});