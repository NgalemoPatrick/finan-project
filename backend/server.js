const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 1337;

// handle statis files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use("/", require("./routes/root"));

app.listen(PORT, () => console.log(`Server listning on port ${PORT}`));
