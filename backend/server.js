const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require('./config/corsoptions')
const PORT = process.env.PORT || 1337;

// middleware call
app.use(logger);

app.use(cors(corsOptions));

// Process json receive and parse json file
app.use(express.json());

app.use(cookieParser());

// handle static files
app.use(express.static("public"));

// routes
app.use("/", require("./routes/root"));

// handle route not found
app.all("*", (req, res) => {
  res.status(404);
  // check the request header
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    req.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server listning on port ${PORT}`));
