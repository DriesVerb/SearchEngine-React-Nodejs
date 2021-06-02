const express = require(`express`);
const app = express();
require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

mongoose
  .connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`MongoDB is connected`);
  })
  .catch(() => {
    console.log(`Error`);
  });

const userRouter = require(`./routes/user`);

app.use("/user", userRouter);

app.listen(5000, () => {
  console.log(`Backend is running on 5000`);
});
