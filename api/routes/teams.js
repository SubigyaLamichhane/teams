const router = require("express").Router();
const Teams = require("../models/Teams");

//new conv

router.post("/", async (req, res) => {
  const newTeams = new Teams({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedTeams = await newTeams.save();
    res.status(200).json(savedTeams);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const Teams = await Teams.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(Teams);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const Teams = await Teams.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(Teams)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
