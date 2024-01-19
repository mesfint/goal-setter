const express = require("express");
const dotenv = require("dotenv").config(); //Usefull to read env
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // It parse url, when we create parameters etc

app.use("/api/goals", require("./routes/goalRoutes"));
//This will update the default express error handler
app.use(errorHandler);

app.listen(port, () => console.log("Server is connected! " + port));
