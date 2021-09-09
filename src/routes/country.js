const express = require("express");
const Country = require("../models/country").module;
const router = express.Router();

router.post("/countries", async (req, res) => {
  try {
    const country = await Country.updateOne(
      { name: req.body.name.trim() },
      req.body,
      {
        upsert: true,
      }
    );
    if (!country) return res.status(400).send();
    else return res.status(200).send(country);
  } catch (e) {
    return res.status(500).send();
  }
});

router.get("/countries", async (req, res) => {
  try {
    const result = await Country.find().sort([
      ["gold", -1],
      ["silver", -1],
      ["bronze", -1],
    ]);
    return res.status(200).send(result);
  } catch (e) {
    return res.status(500).send();
  }
});

router.patch("/countries/inc", async (req, res) => {
  try {
    const cnt = req.query.country;
    if (!cnt) return res.status(400).send({ error: "No country provided!" });

    const country = await Country.findOneAndUpdate(
      {
        name: cnt,
      },
      {
        $inc: {
          cheers: 1,
        },
      }
    );

    if (!country) return res.status(400).send();
    else return res.status(200).send(country);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

exports.module = router;
