const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config(); //Usefull to read env
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // It parse url, when we create parameters etc

//Routes
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
//This will update the default express error handler
app.use(errorHandler);

app.listen(port, () => console.log("Server is connected! " + port));
