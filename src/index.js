require("./mongo");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const eventRouter = require("./routes/event").module;
const countryRouter = require("./routes/country").module;

app.use(express.static("public"));

app.use(express.json());
app.use(eventRouter);
app.use(countryRouter);

app.get("*", (req, res) => {
  res.status(404).send("Not Found!");
});

app.listen(PORT, () => console.log(`Running at ${PORT}`));
