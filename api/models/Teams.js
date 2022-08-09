const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teams", TeamsSchema);
