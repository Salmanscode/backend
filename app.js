const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3177;

dotenv.config({
  path: "./config/config.env",
});

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

mongoose.connect(
  process.env.CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (e) => {
    console.log(e ? e : "Connected successfully to database");
  }
);

app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
