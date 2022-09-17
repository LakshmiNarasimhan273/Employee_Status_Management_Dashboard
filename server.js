const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

// Assign a express module into app
const app = express();

// mongo connection

const connectDB = require("./server/database/connection");

// dotEnv Section
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3005;

// Morgan Section
app.use(morgan("tiny"));

// mongoDB connection Using function to call and connect
connectDB();

// Body-Parser Section
app.use(bodyparser.urlencoded({ extended: true }));
// Set View Engine
app.set("view engine", "ejs");

// Assets Loading
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// Loading a Routers from external JS File;

app.use("/", require("./server/routes/router"));

// This one is for PORT and final step
app.listen(PORT, () => {
  console.log(`Server Ready to use at http://localhost:${PORT}`);
});
