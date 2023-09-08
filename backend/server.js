const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const PORT = process.env.PORT || 1337;

// middleware call
app.use(logger);
// Process json receive and parse json file
app.use(express.json());

// handle static files
app.use(express.static("public"));

// routes
app.use("/", require("./routes/root"));

app.listen(PORT, () => console.log(`Server listning on port ${PORT}`));

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
