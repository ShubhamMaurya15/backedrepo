const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  //   res.send("Home Page");
  res.status(200).json({
    status: "success",
    message: "Home",
  });
});

app.use("/user", userRouter);
app.use("/task", taskRouter);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connection Successfull");
    app.listen(process.env.PORT, () =>
      console.log(`Listening to port : ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err.message));
