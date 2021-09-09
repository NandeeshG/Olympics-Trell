const express = require("express");
const Event = require("../models/event").module;
const router = express.Router();

router.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const result = await event.save();
    if (!result) return res.status(400).send();
    else return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

// Queries are joined by AND
router.get("/events", async (req, res) => {
  try {
    let result = {};
    if (!req.query.dt && !req.query.country) result = await Event.find({});
    else
      result = await Event.find({
        $or: [
          {
            dt: req.query.dt,
          },
          {
            /*only ctry*/
            $or: [
              { country1: (req.query.country || "").trim() },
              { country2: (req.query.country || "").trim() },
            ],
          },
          {
            /*dt and ctry*/
            $and: [
              {
                dt: req.query.dt,
              },
              {
                $or: [
                  { country1: (req.query.country || "").trim() },
                  { country2: (req.query.country || "").trim() },
                ],
              },
            ],
          },
        ],
      });
    if (!result) return res.status(404).send();
    else return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

exports.module = router;
