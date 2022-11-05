const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const usersRouter=require("./routes/users")
const loginRouter=require("./routes/login")
const app = express();

app.use(express.json());
app.use(cors());

// router middleware
app.use("/register",usersRouter)
app.use("/login",loginRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
