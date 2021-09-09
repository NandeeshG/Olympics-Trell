const mongoose = require("mongoose");
const validCountries = ["india", "usa"];

const Event = mongoose.model("Event", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dt: {
    type: String,
    required: true,
  },
  country1: {
    type: String,
    required: true,
    trim: true,
    validate(r) {
      if (!validCountries.includes(r)) throw new Error("Not a valid country");
    },
  },
  country2: {
    type: String,
    required: true,
    trim: true,
    validate(r) {
      if (!validCountries.includes(r)) throw new Error("Not a valid country");
    },
  },
});

exports.module = Event;
