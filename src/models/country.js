const mongoose = require("mongoose");

const Country = mongoose.model("Country", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gold: {
    type: Number,
    default: 0,
    validate(v) {
      if (v < 0) throw new Error("Medal Count can't be negative!");
    },
  },
  silver: {
    type: Number,
    default: 0,
    validate(v) {
      if (v < 0) throw new Error("Medal Count can't be negative!");
    },
  },
  bronze: {
    type: Number,
    default: 0,
    validate(v) {
      if (v < 0) throw new Error("Medal Count can't be negative!");
    },
  },
  cheers: {
    type: Number,
    default: 0,
    validate(v) {
      if (v < 0) throw new Error("Medal Count can't be negative!");
    },
  },
});

exports.module = Country;
