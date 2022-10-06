const path = require("path");

const express = require("express");
const app = express();

// Enable the server to retreive and use the files in the public folder
app.use(express.static(path.resolve(__dirname, "public")));
// Enable server to read json objects from the HTML body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 8080, (req, res) => {
  console.log("Server started on port 8080");
});
